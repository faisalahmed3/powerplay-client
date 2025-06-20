import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import Loading from '../../components/Loading/Loading';

const BookEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://powerplay-server-beta.vercel.app/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch events:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event =>
        event.type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchQuery, events]);

  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <div className="min-h-screen text-white px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-yellow-400">Browse & Book Sports Events</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-xl">
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-yellow-400" />
          <input
            type="text"
            placeholder="Search by category (e.g., Swimming, Sprinting...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* Event Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center text-gray-400">No events found for "{searchQuery}"</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEvents.map(event => (
            <div
              key={event._id}
              className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-3">
                <h3 className="text-2xl font-semibold text-white">{event.name}</h3>
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <FaCalendarAlt className="text-yellow-400" /> {event.date}
                </p>
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <MdCategory className="text-green-400" /> {event.type || 'Not specified'}
                </p>
                <Link
                  to={`/event/${event._id}`}
                  className="inline-block mt-3 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookEvents;
