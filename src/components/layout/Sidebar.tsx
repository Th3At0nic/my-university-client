import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/adminRoutes";
import { facultyPaths } from "../../routes/facultyRoutes";
import { studentPaths } from "../../routes/StudentRoutes";
import { useAppSelector } from "../../redux/hooks";
import {
  TUserFromToken,
  userCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

export const Sidebar = () => {
  const token = useAppSelector(userCurrentToken);

  let user = null;

  if (token) {
    user = verifyToken(token) as TUserFromToken;
  }

  // Using `user!` to assert that `user` is never null or undefined at this point.
  // This should only be used when we're 100% sure `user` exists to avoid runtime errors.
  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      {/* Logo */}
      <div
        className="demo-logo-vertical"
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "0.8rem",
          margin: "18px auto 18px",
        }}
      >
        <h1>My University</h1>
      </div>

      {/* Sidebar Menu - Takes Remaining Space */}

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
