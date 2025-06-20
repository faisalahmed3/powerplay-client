import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router';
import { FaCalendarAlt, FaMapPin } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading/Loading';
import { MdCategory } from "react-icons/md";


const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://powerplay-server-beta.vercel.app/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching event:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = () => {
  if (!event || !user?.email) return;

  const { _id, ...eventData } = event;
  const bookingData = { ...eventData, user_email: user.email };

  fetch('https://powerplay-server-beta.vercel.app/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  })
    .then(res => res.json())
    .then(data => {
      if (data.insertedId || data.acknowledged) {
        Swal.fire({
          icon: 'success',
          title: 'Event Booked!',
          text: `${event.name} has been successfully booked.`,
          confirmButtonColor: '#facc15',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'You have already booked this.',
          confirmButtonColor: '#f87171',
        });
      }
    })
    .catch(err => {
      console.error('Booking error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong while booking.',
        confirmButtonColor: '#f87171',
      });
    });
};


  if (loading) {
    return <Loading></Loading>
  }

  if (!event) {
    return <div className="text-white text-center py-20 text-2xl font-bold">Event not found.</div>;
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-12 text-white">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg">
        <img src={event.image} alt={event.name} className="w-full h-64 object-cover" />
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold">{event.name}</h2>
          <p className="text-gray-400 flex items-center gap-2">
            <FaCalendarAlt className='text-yellow-400'/> {event.date}
          </p>
          <p className="text-gray-400 flex items-center gap-2">
            <MdCategory className='text-green-400' />  {event.type || 'Location not specified'}
          </p>
          <p className="text-gray-300">{event.description}</p>

          <button
            onClick={handleBooking}
            className="mt-4 text-black px-6 py-2 rounded-md font-semibold allBtn transition"
          >
            Book Now
          </button>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/book-events"
          className="inline-block text-black px-5 py-2 rounded-md font-semibold allBtn transition"
        >
          See More Events
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
