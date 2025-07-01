import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import logo from '../../assets/Logo.png';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Set threshold here
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/book-events', label: 'Book Events' },
    ...(user
      ? [
          { to: '/my-booking', label: 'My Booking' },
          { to: '/manage-event', label: 'Manage Events' },
        ]
      : []),
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div
        className={`navbar px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 ${
          scrolled
            ? 'bg-white/10 backdrop-blur-md border-b border-white/10 shadow-md'
            : 'bg-transparent'
        } transition-all duration-300`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks.map((item) => {
                const isActive =
                  item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
                return (
                  <li
                    key={item.to}
                    className={`navBtns ${isActive ? 'border-l-4 border-yellow-400 bg-base-200' : ''}`}
                  >
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="PowerPlay Logo" className="h-10 sm:h-6 md:h-9 lg:h-12 xl:h-14" />
            <h1 className="font-extrabold inter yText text-xl sm:text-2xl md:text-3xl lg:text-4xl">PowerPlay</h1>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 lato text-base md:text-lg font-semibold">
            {navLinks.map((item) => {
              const isActive =
                item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
              return (
                <li key={item.to} className={`navBtns ${isActive ? 'border-b-2 border-yellow-400' : ''}`}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL}
                alt="User"
                className="h-10 w-10 rounded-full border border-gray-300"
                title={user.displayName || 'User'}
              />
              <button
                onClick={logout}
                className="btn allBtn text-black font-bold px-4 py-2 bg-yellow-400 hover:bg-yellow-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="btn allBtn text-black font-bold px-4 py-2 bg-yellow-400 hover:bg-yellow-300">
                Login
              </Link>
              <Link to="/register" className="btn allBtn text-black font-bold px-4 py-2 bg-yellow-400 hover:bg-yellow-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
