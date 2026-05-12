import { Outlet } from "react-router-dom";
import UserNavbar from "@/components/layout/UserNavbar";
import Footer from "@/components/client/Footer";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-white">
      <UserNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
