import { AuthContext } from "../../../contexts/AuthContext";
import { Link, NavLink, useLocation } from "react-router";
import { PuffLoader } from "react-spinners";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

const NavBar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const { user, logOut, loading } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>

      <li>
        <NavLink to="/contact">Contact </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              {navLinks}
            </ul>
          </div>
          <NavLink
            to="/"
            className="flex justify-center items-center font-bold "
          >
            <span className="text-yellow-400 p-1">Style</span>Decor
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex nav-new">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {/* theme control */}

          <button onClick={toggleTheme} className="btn btn-ghost btn-circle ">
            {theme === "light" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {/* profile */}

          {loading ? (
            <div>
              <PuffLoader size={40} />
            </div>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li>
                  <a>{user?.email}</a>
                </li>
                <li>
                  <a>{user?.displayName}</a>
                </li>
                <li>
                  <p onClick={handleLogOut}>Logout</p>
                </li>
              </ul>
            </div>
          ) : isLoginPage ? (
            <Link to="/register">Register</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
