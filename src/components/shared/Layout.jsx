import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SidebarWrapper } from "..";

const Layout = ({ children }) => {
  return (
    <SidebarWrapper>
      {children}
      <Outlet />
      <Toaster position="top-right" />
    </SidebarWrapper>
  );
};

export default Layout;
