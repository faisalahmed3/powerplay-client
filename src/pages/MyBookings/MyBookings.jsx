import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import { MdDelete, MdViewModule, MdTableChart } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading/Loading';

const MyBookings = () => {
  const [view, setView] = useState('card');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Fetch user-specific bookings
  useEffect(() => {
    if (user?.email) {
      fetch(`https://powerplay-server-beta.vercel.app/bookings?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setBookings(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching bookings:', err);
          setLoading(false);
        });
    }
  }, [user]);

  // Delete booking
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f87171',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://powerplay-server-beta.vercel.app/bookings/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setBookings(prev => prev.filter(booking => booking._id !== id));
              Swal.fire({
                icon: 'success',
                title: 'Cancelled!',
                text: 'Your booking has been cancelled.',
                confirmButtonColor: '#facc15',
              });
            }
          })
          .catch(err => {
            console.error('Error deleting booking:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Something went wrong while deleting.',
              confirmButtonColor: '#f87171',
            });
          });
      }
    });
  };

  if (loading) return <Loading />;

  if (!bookings.length) {
    return <div className="text-white text-center mt-20 text-xl inter">No bookings found.</div>;
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-10 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="inter yText text-3xl font-bold text-center w-full">My Bookings</h1>
        <button
          onClick={() => setView(view === 'card' ? 'table' : 'card')}
          className="btn allBtn text-black bg-yellow-400 hover:bg-yellow-300 transition-all duration-200 ml-auto"
        >
          {view === 'card' ? <MdTableChart className="text-xl" /> : <MdViewModule className="text-xl" />}
        </button>
      </div>

      {view === 'card' ? (
        <div className="flex flex-col items-center space-y-6 max-w-6xl mx-auto">
          {bookings.map(booking => (
            <div
              key={booking._id}
              className="flex flex-col lg:flex-row items-center gap-6 p-6 border border-gray-700 rounded-lg w-full"
            >
              <img
                src={booking.image}
                alt={booking.name}
                className="w-40 h-40 object-cover rounded-md border border-gray-700"
              />
              <div className="flex-1 space-y-2 text-center lg:text-left">
                <h2 className="inter text-2xl font-bold">{booking.name}</h2>
                <p className="lato text-sm text-gray-400">{booking.type}</p>
                <p className="ss3 text-gray-300 text-sm">{booking.description}</p>
                <p className="ss3 text-gray-500 text-sm">{booking.date}</p>
              </div>
              <button
                className="btn allBtn text-red-600 hover:bg-red-900/20"
                onClick={() => handleDelete(booking._id)}
              >
                <MdDelete className="text-xl" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto mt-4 max-w-6xl mx-auto border border-gray-700 rounded-lg">
          <table className="table w-full text-white">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="text-left px-4 py-2">Event</th>
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900">
              {bookings.map(booking => (
                <tr key={booking._id} className="border-t border-gray-700">
                  <td className="px-4 py-3">{booking.name}</td>
                  <td className="px-4 py-3">{booking.type}</td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3">
                    <button
                      className="btn allBtn text-red-600 hover:bg-red-900/20"
                      onClick={() => handleDelete(booking._id)}
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/book-events"
          className="btn allBtn lato px-6 py-3 text-lg font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg shadow-md"
        >
          View All Events
        </Link>
      </div>
    </div>
  );
};

export default MyBookings;
