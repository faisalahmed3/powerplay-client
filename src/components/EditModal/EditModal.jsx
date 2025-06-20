import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 

const EditModal = ({ event, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    image: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name,
        type: event.type,
        image: event.image,
        date: event.date,
        description: event.description,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://powerplay-server-beta.vercel.app/events/${event._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Your event has been updated successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
        onUpdate();
        onClose();
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Changes',
          text: 'Nothing was updated because there were no changes.',
        });
      }
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Something went wrong. Please try again.',
      });
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="rounded-2xl p-8 w-full max-w-2xl border border-yellow-400 bg-transparent backdrop-blur-lg">
        <h2 className="text-2xl font-bold mb-6 text-white text-center inter">Edit Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4 lato">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full p-3 rounded-md border border-yellow-400 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Event Type"
            className="w-full p-3 rounded-md border border-yellow-400 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-3 rounded-md border border-yellow-400 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-yellow-400 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 rounded-md border border-yellow-400 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows="4"
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md allBtn text-black  transition-all"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
