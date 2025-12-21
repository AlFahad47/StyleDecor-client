import React, { useContext } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  FaMotorcycle,
  FaRegCreditCard,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import {
  MdManageAccounts,
  MdMiscellaneousServices,
  MdDesignServices,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";

import { RiEBikeFill } from "react-icons/ri";
import { SiGoogletasks } from "react-icons/si";
import useRole from "../hooks/useRole";
import { ThemeContext } from "../contexts/ThemeProvider";

const DashboardLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}

        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">StyleDecor Dashboard</div>
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle  ">
            {theme === "light" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </nav>

        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link className="text-yellow-400   font-bold" to="/">
                SD
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Home page</span>
              </Link>
            </li>

            {/* our dashboard links */}

            {/* <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
                to="/dashboard/payment-history"
              >
                <FaRegCreditCard />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li> */}
            {role === "user" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                    to="/dashboard/profile"
                  >
                    <CgProfile />

                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Bookings"
                    to="/dashboard/my-bookings"
                  >
                    <FaTasks />
                    <span className="is-drawer-close:hidden">My Bookings</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payment History"
                    to="/dashboard/payment-history"
                  >
                    <SiGoogletasks />
                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {role === "decorator" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Assigned Projects"
                    to="/dashboard/assigned-projects"
                  >
                    <FaTasks />
                    <span className="is-drawer-close:hidden">
                      My Assigned Projects
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Today's Schedule"
                    to="/dashboard/schedule"
                  >
                    <SiGoogletasks />
                    <span className="is-drawer-close:hidden">
                      Today's Schedule
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payment History"
                    to="/dashboard/decorator-payment-history"
                  >
                    <FaRegCreditCard />
                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* admin only links */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Decorators"
                    to="/dashboard/manage-decorators"
                  >
                    <FaUsers></FaUsers>
                    <span className="is-drawer-close:hidden">
                      Manage Decorators
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Services & Packages"
                    to="/dashboard/manage-services"
                  >
                    <MdMiscellaneousServices />

                    <span className="is-drawer-close:hidden">
                      Manage Services & Packages
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Bookings"
                    to="/dashboard/manage-bookings"
                  >
                    <MdDesignServices />
                    <span className="is-drawer-close:hidden">
                      Manage Bookings
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
