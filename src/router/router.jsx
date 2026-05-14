import { lazy } from "react";
import { Navigate } from "react-router-dom";
import UserLayout from "@/layouts/UserLayout";
import ProfileLayout from "@/layouts/ProfileLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const LoginPage          = lazy(() => import("@/pages/client/login"));
const OneId              = lazy(() => import("@/pages/client/oneid"));
const NotFoundPage       = lazy(() => import("@/pages/client/not-found"));
const HomePage           = lazy(() => import("@/pages/client/home"));
const ServicesPage       = lazy(() => import("@/pages/client/services"));
const ServiceDetailPage  = lazy(() => import("@/pages/client/services/detail"));

// Profile pages
const MainProfile        = lazy(() => import("@/pages/client/profile/MainProfile"));
const PersonalDataPage   = lazy(() => import("@/pages/client/profile/PersonalData"));
const MyCardsPage        = lazy(() => import("@/pages/client/profile/MyCards"));
const MyPropertyPage     = lazy(() => import("@/pages/client/profile/MyProperty"));
const MyApplicationsPage = lazy(() => import("@/pages/client/profile/MyApplications"));
const SettingsPage       = lazy(() => import("@/pages/client/profile/Settings"));
const RequestsPage       = lazy(() => import("@/pages/client/profile/Requests"));
const AccessPage         = lazy(() => import("@/pages/client/profile/Access"));
const PaymentHistoryPage = lazy(() => import("@/pages/client/profile/PaymentHistory"));
const ServiceHistoryPage = lazy(() => import("@/pages/client/profile/ServiceHistory"));

// Property detail
const PropertyDetail       = lazy(() => import("@/pages/client/profile/PropertyDetail"));
const PaymentsPage         = lazy(() => import("@/pages/client/profile/property/Payments"));
const PlotInfoPage         = lazy(() => import("@/pages/client/profile/property/PlotInfo"));
const ResidentsPage        = lazy(() => import("@/pages/client/profile/property/Residents"));
const TenantsPage          = lazy(() => import("@/pages/client/profile/property/Tenants"));
const PropertyMapPage      = lazy(() => import("@/pages/client/profile/property/PropertyMap"));
const PropertyServicesPage = lazy(() => import("@/pages/client/profile/property/PropertyServices"));
const PropertyRequestsPage = lazy(() => import("@/pages/client/profile/property/PropertyRequests"));
const PropertyAccessPage   = lazy(() => import("@/pages/client/profile/property/PropertyAccess"));

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

      {
        path: "profile",
        element: <ProtectedRoute><ProfileLayout /></ProtectedRoute>,
        children: [
          { index: true,              element: <MainProfile /> },
          { path: "personal",         element: <PersonalDataPage /> },

          // Cards list
          { path: "cards",            element: <MyCardsPage /> },

          // Property detail (nested)
          {
            path: "cards/:id",
            element: <PropertyDetail />,
            children: [
              { index: true,       element: <Navigate to="payments" replace /> },
              { path: "payments",  element: <PaymentsPage /> },
              { path: "info",      element: <PlotInfoPage /> },
              { path: "residents", element: <ResidentsPage /> },
              { path: "tenants",   element: <TenantsPage /> },
              { path: "map",       element: <PropertyMapPage /> },
              { path: "services",  element: <PropertyServicesPage /> },
              { path: "requests",  element: <PropertyRequestsPage /> },
              { path: "access",    element: <PropertyAccessPage /> },
            ],
          },

          { path: "property",         element: <MyPropertyPage /> },
          { path: "applications",     element: <MyApplicationsPage /> },
          { path: "settings",         element: <SettingsPage /> },
          { path: "requests",         element: <RequestsPage /> },
          { path: "access",           element: <AccessPage /> },
          { path: "payments",         element: <PaymentHistoryPage /> },
          { path: "services-history", element: <ServiceHistoryPage /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
];
