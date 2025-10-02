import ScrollTop from "@components/Custom/ScrollTop";
import Dock from "@components/Navigation/Dock";
import Navbar from "@components/Navigation/Navbar";
import { Outlet } from "react-router";

const LandingLayout = () => {
  return (
    <>
      <ScrollTop />
      {/* <Dock />
      <Navbar /> */}
      <div className="p-4 ">
        <Outlet />
      </div>
    </>
  );
};

export default LandingLayout;
