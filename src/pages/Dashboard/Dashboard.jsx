import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);

  useEffect(() => {
    if (user?.email) {
        
      fetch(`https://powerplay-server-beta.vercel.app/bookings?email=${user.email}`)
        .then(res => res.json())
        .then(data => setBookingsCount(data.length));

      fetch(`https://powerplay-server-beta.vercel.app/events?email=${user.email}`)
        .then(res => res.json())
        .then(data => setEventsCount(data.length));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-white text-center mt-20 text-xl inter">
        No user information available.
      </div>
    );
  }

  return (
    <div className="min-h-screen lato py-16 px-4 flex flex-col items-center gap-10">

      {/* User Info */}
      <div className="bg-white/30 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-2xl w-full max-w-md text-center space-y-6">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-28 h-28 rounded-full border-4 border-yellow-400 mx-auto"
        />
        <h2 className="text-2xl font-bold inter text-white">{user.displayName || 'User'}</h2>
        <p className="text-gray-200 ss3">{user.email}</p>
        <div className="border-t border-white/20 pt-6">
          <p className="text-sm text-gray-300 italic ss3">
            Welcome back! Let’s stay on top of your activities.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white/20 backdrop-blur-lg border border-white/20 p-6 rounded-xl text-center shadow-xl">
          <h3 className="text-xl font-bold inter text-yellow-300">My Bookings</h3>
          <p className="text-4xl text-white mt-2">{bookingsCount}</p>
          <Link to="/my-booking" className="mt-4 inline-block text-sm allBtn text-black px-4 py-2 rounded-md font-semibold">
            View Bookings
          </Link>
        </div>

        <div className="bg-white/20 backdrop-blur-lg border border-white/20 p-6 rounded-xl text-center shadow-xl">
          <h3 className="text-xl font-bold inter text-yellow-300">Events Created</h3>
          <p className="text-4xl text-white mt-2">{eventsCount}</p>
          <Link to="/manage-event" className="mt-4 inline-block text-sm allBtn text-black px-4 py-2 rounded-md font-semibold">
            Manage Events
          </Link>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="w-full max-w-4xl mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/manage-event/create"
          className="bg-yellow-400 hover:bg-yellow-300 text-black text-center px-6 py-4 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          <FaPlus /> Create New Event
        </Link>
        <Link
          to="/book-events"
          className="bg-yellow-400 hover:bg-yellow-300 text-black text-center px-6 py-4 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          <FaCalendarAlt /> Browse Events
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
