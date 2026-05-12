const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

export function checkRateLimit(key) {
  const now = Date.now()
  const storageKey = `rl_${key}`

  try {
    const raw = sessionStorage.getItem(storageKey)
    const data = raw ? JSON.parse(raw) : { attempts: 0, firstAttempt: now }

    if (now - data.firstAttempt > RATE_LIMIT_WINDOW_MS) {
      sessionStorage.setItem(storageKey, JSON.stringify({ attempts: 1, firstAttempt: now }))
      return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
    }

    if (data.attempts >= RATE_LIMIT_MAX) {
      const resetIn = Math.ceil((data.firstAttempt + RATE_LIMIT_WINDOW_MS - now) / 60000)
      return { allowed: false, remaining: 0, resetIn }
    }

    const updated = { ...data, attempts: data.attempts + 1 }
    sessionStorage.setItem(storageKey, JSON.stringify(updated))
    return { allowed: true, remaining: RATE_LIMIT_MAX - updated.attempts }
  } catch {
    return { allowed: true, remaining: RATE_LIMIT_MAX }
  }
}

export function resetRateLimit(key) {
  try {
    sessionStorage.removeItem(`rl_${key}`)
  } catch {
    // sessionStorage not available
  }
}

export function validateLength(input, min, max) {
  const len = input?.trim().length ?? 0
  return len >= min && len <= max
}

// Generates a cryptographically random hex string (for session/CSRF tokens)
export function generateSecureToken(bytes = 32) {
  const arr = new Uint8Array(bytes)
  crypto.getRandomValues(arr)
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('')
}
