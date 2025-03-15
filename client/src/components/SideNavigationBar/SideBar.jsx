import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css"; // Default styles
import {
  FaBars,
  FaUser,
  FaHome,
  FaTrophy,
  FaCalendar,
  FaUserGraduate,
  FaInfo,
  FaFileCode,
  FaLaptopCode,
  FaUserTie,
} from "react-icons/fa";
import {
  FaFileLines,
  FaPeopleGroup,
  FaRightFromBracket,
  FaRightToBracket,
  FaX,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "../../data/images/nexus.png";

const CustomSidebar = () => {
  const [collapsed, setCollapsed] = useState(true); // State to toggle sidebar

  const menuList = [
    {
      title: "Home",
      icon: <FaHome className="text-2xl" />,
      link: "/",
    },
    {
      title: "Team",
      icon: <FaPeopleGroup className="text-2xl" />,
      link: "/team",
    },
    {
      title: "Achievements",
      icon: <FaTrophy className="text-2xl" />,
      link: "/achievements",
    },
    {
      title: "Events",
      icon: <FaCalendar className="text-2xl" />,
      link: "/events",
    },
    {
      title: "Forms",
      icon: <FaFileLines className="text-2xl" />,
      link: "/forms",
    },
    {
      title: "Connect",
      icon: <FaUserGraduate className="text-2xl" />,
      link: "/connect",
    },
    {
      title: "Projects",
      icon: <FaFileCode className="text-2xl" />,
      link: "/projects",
    },
    {
      title: "Coding Profile LeaderBoard",
      icon: <FaLaptopCode className="text-2xl" />,
      link: "/coding",
    },
    {
      title: "Interview Experience",
      icon: <FaUserTie className="text-2xl" />,
      link: "/interview-experiences",
    },
    {
      title: "Profile",
      icon: <FaUser className="text-2xl" />,
      link: "/profile",
    },
    {
      title: "About",
      icon: <FaInfo className="text-2xl" />,
      link: "/about",
    },
  ];

  return (
    <ProSidebar
      collapsed={collapsed}
      className="fixed left-0 top-0 z-9999 h-screen bg-black-2 bg-opacity-95"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {/* Logo and Nexus Text (Visible when sidebar is expanded) */}
          {!collapsed && (
            <div className="ml-4 flex items-center">
              <Link to={"/"}>
                <img
                  src={Logo}
                  alt="Nexus_Official"
                  className="h-8 w-8"
                />
              </Link>
              <span className="mx-2 text-xl uppercase text-white/80">
                Nexus
              </span>
            </div>
          )}

          {/* Toggle Button */}
          <MenuItem
            icon={collapsed ? <FaBars size={16} /> : <FaX size={16} />}
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-gray-100 hover-icon transition-transform duration-200 hover:scale-110 hover:text-blue-500"
          ></MenuItem>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Menu iconShape="circle" className="overflow-visible">
            {/* Menu Items */}
            {menuList.map((item, index) => {
              return (
                <MenuItem
                  icon={React.cloneElement(item.icon, {
                    size: 16,
                    className: "hover-icon text-white",
                  })}
                  className="hover:bg-gray-100 transition-transform duration-200 hover:scale-110 hover:text-blue-500 my-2"
                  title={item.title}
                  onClick={() => setCollapsed(true)}
                >
                  {/* Bubble Animation Effect with Blue Color */}
                  <div className="absolute left-0 top-0 h-full w-full rounded-full bg-blue-500/30 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"></div>

                  {/* Hover Box for Menu Item Name (Right Side and Above the Screen) */}
                  {collapsed && (
                    <div className="absolute left-2 -top-6 bg-white text-black px-2 py-1 rounded-md opacity-0 text-sm group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                      {item.title}
                    </div>
                  )}

                  {!collapsed && (
                    <span className="ml-4 text-lg font-medium">{item.title}</span>
                  )}
                  <Link to={item.link} />
                </MenuItem>
              );
            })}
            {/* SubMenu */}
            {/* <SubMenu title={!collapsed ? "Components" : ""} icon={<FaHeart />}>
              <MenuItem className="hover:bg-gray-100">Component 1</MenuItem>
              <MenuItem className="hover:bg-gray-100">Component 2</MenuItem>
            </SubMenu> */}

{localStorage.getItem("token") ? (
  <MenuItem
    icon={<FaRightFromBracket className="hover-icon text-white" />}
    className="hover:bg-gray-100 transition-transform duration-200 hover:scale-110 hover:text-blue-500 my-2"
    title={"Logout"}
    onClick={() => {
      localStorage.removeItem("token"); // Remove token from storage
      window.location.href = "/login"; // Redirect to login page
      setCollapsed(true);
    }}
  >
    {!collapsed && "Logout"}
  </MenuItem>
) : (
  <MenuItem
    icon={<FaRightToBracket className="hover-icon text-white" />}
    className="hover:bg-gray-100 transition-transform duration-200 hover:scale-110 hover:text-blue-500 my-2"
    title={"Login"}
    onClick={() => setCollapsed(true)}
  >
    {!collapsed && "Login"}
    <Link to={"/login"} />
  </MenuItem>
)}

          </Menu>
        </div>
      </div>
      <style jsx>{`
        .pro-sidebar > .pro-sidebar-inner {
          background-color: transparent;
        }
      `}</style>
    </ProSidebar>
  );
};

export default CustomSidebar;