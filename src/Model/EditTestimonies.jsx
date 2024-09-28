import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { endPoint } from '../forAll/forAll';

const EditTestimonies = ({ testimonyId, onClose, currentData }) => {
  const [formData, setFormData] = useState(currentData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(currentData); // Populate form with current data when the modal opens
  }, [currentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${endPoint}/testimonial/${testimonyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Testimonial updated successfully!',
          icon: 'success',
        });
        onClose(); // Close the modal after successful update
      } else {
        throw new Error('Failed to update testimonial');
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update testimonial. Please try again later.',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-8 shadow-lg relative max-w-md w-full text-black overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-9 right-6 text-gray-800 font-bold hover:text-black"
          onClick={onClose}
        >
          X
        </button>
        {loading ? (
          <>
            Loading... <span className="loading loading-ring loading-lg"></span>
          </>
        ) : (
          <form onSubmit={handleFormUpdate} className="rounded-lg text-black">
            <div className="my-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3"
              />
            </div>
            <div className="my-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3"
              />
            </div>
            <div className="my-4">
              <label htmlFor="testimonial" className="block text-gray-700 font-bold mb-2">
                Testimonial:
              </label>
              <textarea
                id="testimonial"
                name="testimonial"
                value={formData.testimonial}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3"
              />
            </div>
            <div className="my-4">
              <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
                Rating:
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3"
              />
            </div>
            <div className="my-4">
              <label htmlFor="des" className="block text-gray-700 font-bold mb-2">
                Description:
              </label>
              <input
                type="text"
                id="des"
                name="des"
                value={formData.des}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3"
              />
            </div>
            <div className="my-4">
              <label htmlFor="socialMedia" className="block text-gray-700 font-bold mb-2">
                Social Media:
              </label>
              <input
                type="text"
                id="socialMedia"
                name="socialMedia"
                value={formData.socialMedia}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3"
              />
            </div>
            <button type="submit" className="text-white bg-blue-500 py-3 px-4 rounded-lg w-full my-4 hover:bg-blue-600">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTestimonies;
