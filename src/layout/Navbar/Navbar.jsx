import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";

import PlayGuideLogo from "../index";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-br from-purple-800 via-blue-900 to-indigo-900 py-3 sm:py-5 shadow-lg rounded-b-3xl backdrop-blur-sm bg-opacity-95"
            : "bg-transparent py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <NavLink
            to="/"
            className="flex-shrink-0 relative z-[10000]"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
            }}
          >
            <PlayGuideLogo />
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 xl:px-6 py-2 rounded-full font-light transition-colors duration-300 text-white ${
                  isActive ? "font-bold" : "hover:bg-white/20"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background:
                        "linear-gradient(45deg, rgb(34, 211, 238), rgb(168, 85, 247))",
                    }
                  : {}
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-4 xl:px-6 py-2 rounded-full font-light transition-colors duration-300 text-white ${
                  isActive ? "font-bold" : "hover:bg-white/20"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background:
                        "linear-gradient(45deg, rgb(34, 211, 238), rgb(168, 85, 247))",
                    }
                  : {}
              }
            >
              About
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block px-4 xl:px-6 py-2 rounded-full font-light transition-colors duration-300 text-white ${
                  isActive ? "font-bold" : "hover:bg-white/20"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background:
                        "linear-gradient(45deg, rgb(34, 211, 238), rgb(168, 85, 247))",
                    }
                  : {}
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-4 xl:px-6 py-2 rounded-full font-light transition-colors duration-300 text-white ${
                  isActive ? "font-bold" : "hover:bg-white/20"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background:
                        "linear-gradient(45deg, rgb(34, 211, 238), rgb(168, 85, 247))",
                    }
                  : {}
              }
            >
              Contact Us
            </NavLink>
          </div>

          {/* Mobile Menu Button - Fixed z-index */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="text-white text-2xl sm:text-3xl focus:outline-none hover:scale-110 transition-transform duration-200 relative z-[10001]"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu */}
          <div className="lg:hidden fixed top-16 sm:top-20 right-4 w-64 sm:w-72 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden z-[9999] border border-white/20 animate-slide-down">
            <nav className="flex flex-col py-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-100 to-cyan-100 font-semibold text-purple-700"
                      : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-100 to-cyan-100 font-semibold text-purple-700"
                      : ""
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `block px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-100 to-cyan-100 font-semibold text-purple-700"
                      : ""
                  }`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-100 to-cyan-100 font-semibold text-purple-700"
                      : ""
                  }`
                }
              >
                Contact Us
              </NavLink>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
