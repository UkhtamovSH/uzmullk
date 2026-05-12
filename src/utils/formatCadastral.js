export const formatCadastral = (value) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  const joinColon = (parts) => parts.filter(Boolean).join(":");

  if (digits.length <= 10) {
    return joinColon([digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 10)]);
  }

  if (digits.length <= 14) {
    return joinColon([
      digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 6),
      digits.slice(6, 8), digits.slice(8, 10), digits.slice(10, 14),
    ]);
  }

  if (digits.length <= 18) {
    const prefix = joinColon([
      digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 6),
      digits.slice(6, 8), digits.slice(8, 10), digits.slice(10, 14),
    ]);
    const suffix = digits.slice(14, 18);
    return suffix ? `${prefix}/${suffix}` : prefix;
  }

  if (digits.length <= 21) {
    return joinColon([
      digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 6),
      digits.slice(6, 8), digits.slice(8, 10), digits.slice(10, 14),
      digits.slice(14, 18), digits.slice(18, 21),
    ]);
  }

  const base = joinColon([
    digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 6),
    digits.slice(6, 8), digits.slice(8, 10), digits.slice(10, 14),
    digits.slice(14, 18), digits.slice(18, 21),
  ]);
  const tail = digits.slice(21);
  if (tail.length <= 3) return `${base}/${tail}`;
  const blocks = [];
  for (let i = 0; i < tail.length; i += 3) blocks.push(tail.slice(i, i + 3));
  return `${base}:${blocks.filter(Boolean).join(":")}`;
};
