/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../images/logo/logo.png";
// import Menu from "../images/logo/menu.svg";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const handleLogout = () => {
    localStorage.clear();
    Navigate("/login");
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-99 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#fff] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-4 py-4 mt-4">
        <NavLink to="/" className="flex items-center justify-center w-100">
          <img src={Logo} alt="Logo" className="w-[160px]" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div className="flex flex-col justify-between h-[90vh]">
            <ul className="mb-6 flex flex-col gap-1.5 mt-5">
              {/* <!-- Menu Item services --> */}
              <li className="relative">
                {pathname === "/dashboard" || pathname === "/" ? (
                  <div className="bg-[#4880FF] absolute w-[10px] left-[-28px] h-full rounded-md"></div>
                ) : null}
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-md py-4 px-6 font-medium text-black duration-300 ease-in-out dark:hover:bg-meta-4 justify-center ${
                    pathname === "/dashboard" || pathname === "/"
                      ? "bg-[#4880FF] text-white dark:bg-meta-4"
                      : ""
                  }`}
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="relative">
                {pathname === "/users" ? (
                  <div className="bg-[#4880FF] absolute w-[10px] left-[-28px] h-full rounded-md"></div>
                ) : null}
                <NavLink
                  to="/users"
                  className={`group relative flex items-center gap-2.5 rounded-md py-4 px-6 font-medium text-black duration-300 ease-in-out dark:hover:bg-meta-4 justify-center ${
                    pathname === "/users"
                      ? "bg-[#4880FF] text-white dark:bg-meta-4"
                      : ""
                  }`}
                >
                  Users
                </NavLink>
              </li>
              <li className="relative">
                {pathname === "/products" ? (
                  <div className="bg-[#4880FF] absolute w-[10px] left-[-28px] h-full rounded-md"></div>
                ) : null}
                <NavLink
                  to="/products"
                  className={`group relative flex items-center gap-2.5 rounded-md py-4 px-6 font-medium text-black duration-300 ease-in-out dark:hover:bg-meta-4 justify-center ${
                    pathname === "/products"
                      ? "bg-[#4880FF] text-white dark:bg-meta-4"
                      : ""
                  }`}
                >
                  Products
                </NavLink>
              </li>
              <li className="relative">
                {pathname === "/view/all/pdf" ? (
                  <div className="bg-[#4880FF] absolute w-[10px] left-[-28px] h-full rounded-md"></div>
                ) : null}
                <NavLink
                  to="/view/all/pdf"
                  className={`group relative flex items-center gap-2.5 rounded-md py-4 px-6 font-medium text-black duration-300 ease-in-out dark:hover:bg-meta-4 justify-center ${
                    pathname === "/view/all/pdf"
                      ? "bg-[#4880FF] text-white dark:bg-meta-4"
                      : ""
                  }`}
                >
                  PDF 1
                </NavLink>
              </li>
              <li className="relative">
                {pathname === "/view/all/inovices" ? (
                  <div className="bg-[#4880FF] absolute w-[10px] left-[-28px] h-full rounded-md"></div>
                ) : null}
                <NavLink
                  to="/view/all/inovices"
                  className={`group relative flex items-center gap-2.5 rounded-md py-4 px-6 font-medium text-black duration-300 ease-in-out dark:hover:bg-meta-4 justify-center ${
                    pathname === "/view/all/inovices"
                      ? "bg-[#4880FF] text-white dark:bg-meta-4"
                      : ""
                  }`}
                >
                  PDF 2
                </NavLink>
              </li>
              {Array.from({ length: 3 }).map((_, index) => (
                <li className="relative">
                  {pathname ===`/all/pdf/${index + 3}` ? (
                    <div className="bg-[#4880FF] absolute w-[10px] left-[-28px] h-full rounded-md"></div>
                  ) : null}
                  <a
                    href={`/all/pdf/${index + 3}`}
                    className={`group relative flex items-center gap-2.5 rounded-md py-4 px-6 font-medium text-black duration-300 ease-in-out dark:hover:bg-meta-4 justify-center ${
                      pathname === `/all/pdf/${index + 3}`
                        ? "bg-[#4880FF] text-white dark:bg-meta-4"
                        : ""
                    }`}
                  >
                    PDF {index + 3}
                  </a>
                </li>
              ))}

              <li className="relative">
                {pathname === "/deposit" ||
                pathname.includes("/add_deposit") ? (
                  <div className="bg-[#4880FF] absolute w-[10px] left-[-28px] h-full rounded-md"></div>
                ) : null}
                <NavLink
                  to="/deposit"
                  className={`group relative flex items-center gap-2.5 rounded-md py-4 px-6 font-medium text-black duration-300 ease-in-out dark:hover:bg-meta-4 justify-center ${
                    pathname === "/deposit" || pathname.includes("/add_deposit")
                      ? "bg-[#4880FF] text-white dark:bg-meta-4"
                      : ""
                  }`}
                >
                  Deposit
                </NavLink>
              </li>
            </ul>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  onClick={handleLogout}
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-4 px-6 font-medium text-black duration-300 ease-in-out dark:hover:bg-meta-4 justify-center`}
                >
                  Logout
                </NavLink>
              </li>
              {/* <!-- Menu Item Forms --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
