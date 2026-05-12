import ManageProperty from "../../../components/client/home/ManageProperty";
import Features from "../../../components/client/home/Features";
import Services from "../../../components/client/home/Services";
import Capabilities from "../../../components/client/home/Capabilities";
import AppBanner from "../../../components/client/home/AppBanner";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="">
      <ManageProperty />
      <Features />
      <Services />
      <Capabilities />
      <AppBanner />
    </div>
  );
}
