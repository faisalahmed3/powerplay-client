import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Create = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    image: '',
    date: '',
    description: '',
    creatorEmail: user?.email || '',
    creatorName: user?.displayName || ''
  });

  const eventTypes = [
    "Swimming", "Sprinting", "Long Jump", "High Jump", "Hurdle Race"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://powerplay-server-beta.vercel.app/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Event created successfully!',
          confirmButtonColor: '#3085d6',
        });
        setFormData({
          name: '',
          type: '',
          image: '',
          date: '',
          description: '',
          creatorEmail: user?.email || '',
          creatorName: user?.displayName || ''
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to create event.',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while creating the event.',
        confirmButtonColor: '#d33',
      });
    }
  };

  const goToMine = () => {
    navigate('/manage-event');
  };

  return (
    <div className="min-h-screen lato py-10 px-4 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md border border-white/30 p-8 rounded-xl shadow-2xl w-full max-w-2xl space-y-5"
      >
        <h2 className="text-3xl font-bold yText text-center mb-6">Create An Event</h2>

        <div>
          <label className="block mb-1 font-semibold">Event Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter event name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Event Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select an event type</option>
            {eventTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Event Date</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="textarea textarea-bordered w-full"
            placeholder="Write a short description"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Creator Email</label>
            <input
              type="email"
              value={formData.creatorEmail}
              disabled
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Creator Name</label>
            <input
              type="text"
              value={formData.creatorName}
              disabled
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button type="submit" className="btn allBtn text-black w-full mt-4">
          Create Event
        </button>
      </form>

      <div className="w-full max-w-2xl mt-6">
        <Link to="./">
          <button onClick={goToMine} className="btn allBtn text-black w-full">
            View My Events
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Create;
