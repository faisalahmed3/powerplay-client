import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';
import EditModal from '../EditModal/EditModal';


const Mine = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null); 

  const fetchUserEvents = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`https://powerplay-server-beta.vercel.app/events?email=${user.email}`);
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserEvents();
  }, [user]);

  // Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://powerplay-server-beta.vercel.app/events/${id}`, {
            method: 'DELETE',
          });
          const data = await res.json();

          if (data.deletedCount === 1) {
            Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
            fetchUserEvents();
          } else {
            Swal.fire('Oops!', 'Event not found or already deleted.', 'error');
          }
        } catch (err) {
          console.error('Failed to delete event:', err);
          Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-10 text-white">
      <h1 className="inter yText text-3xl font-bold mb-8 text-center">My Posted Events</h1>

      {loading ? (
        <Loading />
      ) : events.length === 0 ? (
        <p className="text-gray-400 mb-6 lato">You haven't created any event yet.</p>
      ) : (
        <div className="w-full max-w-6xl space-y-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-6 p-6 border border-gray-700 rounded-lg"
            >
              <div className="flex-shrink-0">
                <img
                  src={event.image}
                  alt="Event"
                  className="w-40 h-40 object-cover rounded-md border border-gray-700"
                />
              </div>

              <div className="flex-1 space-y-2 text-center lg:text-left">
                <h2 className="inter text-2xl font-bold text-white">{event.name}</h2>
                <p className="lato text-sm text-gray-400 font-medium">{event.type}</p>
                <p className="ss3 text-gray-300 text-sm leading-relaxed">{event.description}</p>
                <p className="ss3 text-gray-500 text-sm">{event.date}</p>
              </div>

              <div className="flex gap-4 lg:flex-col justify-center items-center">
                <button
                  className="btn allBtn text-red-600 hover:bg-red-900/20"
                  onClick={() => handleDelete(event._id)}
                >
                  <MdDelete className="text-xl" />
                </button>
                <button
                  className="btn allBtn text-blue-600 hover:bg-blue-900/20"
                  onClick={() => setEditingEvent(event)}
                >
                  <FaEdit className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        to="./create"
        className="btn allBtn lato mt-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center py-3 text-lg font-bold bg-yellow-400 text-black hover:bg-yellow-300 transition-all duration-200 rounded-lg shadow-md"
      >
        Create An Event
      </Link>

      
      {editingEvent && (
        <EditModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onUpdate={fetchUserEvents}
        />
      )}
      
    </div>
  );
};

export default Mine;
