import { lazy } from "react";
import UserLayout from "@/layouts/UserLayout";

const LoginPage = lazy(() => import("@/pages/client/login"));
const OneId = lazy(() => import("@/pages/client/oneid"));
const NotFoundPage = lazy(() => import("@/pages/client/not-found"));
const HomePage = lazy(() => import("@/pages/client/home"));
const ServicesPage       = lazy(() => import("@/pages/client/services"));
const ServiceDetailPage  = lazy(() => import("@/pages/client/services/detail"));

// ── Routes ────────────────────────────────────────────────────────────────────
export const routes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/oneid", element: <OneId /> },

  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "services",     element: <ServicesPage /> },
      { path: "services/:id", element: <ServiceDetailPage /> },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
];
