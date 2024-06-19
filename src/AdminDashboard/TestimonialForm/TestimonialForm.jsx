import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { endPoint } from '../../forAll/forAll';

const imgHostingToken = import.meta.env.VITE_img_upload_token;
      const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${imgHostingToken}`;

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    email: '',
    testimonial: '',
    rating: '',
    des: '',
    socialMedia: '',
    isActive: true // Assuming default value for isActive
  });

  const [imageUpload, setImageUpload] = useState({
    imageUrl: '', // State to store the uploaded image URL
    loading: false // Loading state for image upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      setImageUpload({ ...imageUpload, loading: true });
      // Replace 'YOUR_API_KEY' with your actual ImageBB API key
      const response = await fetch(imgHostingUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log(response, data.url, data.data.url)

      if (data && data.data && data.data.url) {
        setImageUpload({ imageUrl: data.data.url, loading: false });
        setFormData({ ...formData, image: data.data.url });
        Swal.fire({
          title: 'Image Uploaded!',
          text: 'Image uploaded successfully.',
          icon: 'success'
        });
      } else {
        throw new Error('Failed to get image URL from response');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageUpload({ ...imageUpload, loading: false });
      Swal.fire({
        title: 'Error!',
        text: 'Failed to upload image.',
        icon: 'error'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${endPoint}/testimonial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Testimonial added:', data);
        Swal.fire({
          title: 'Success!',
          text: 'Testimonial added successfully.',
          icon: 'success'
        });
        // Clear form fields after successful submission
        setFormData({
          image: '',
          name: '',
          email: '',
          testimonial: '',
          rating: '',
          des: '',
          socialMedia: '',
          isActive: true
        });
      } else {
        throw new Error('Failed to add testimonial');
      }
    } catch (error) {
      console.error('Error adding testimonial:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add testimonial.',
        icon: 'error'
      });
    }
  };

  return (
    <div className="testimonial-form-container bg-gray-800 text-white p-8 rounded-lg shadow-lg my-10">
      <h2 className="text-3xl text-center mb-5">Add Testimonial</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
          <input
            type="text"
            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
          <input
            type="email"
            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="testimonial" className="block text-sm font-medium text-gray-400">Testimonial</label>
          <textarea
            className="form-textarea mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="testimonial"
            name="testimonial"
            value={formData.testimonial}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-400">Rating</label>
          <input
            type="number"
            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="des" className="block text-sm font-medium text-gray-400">Description</label>
          <textarea
            className="form-textarea mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="des"
            name="des"
            value={formData.des}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-400">Social Media Link</label>
          <input
            type="text"
            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="socialMedia"
            name="socialMedia"
            value={formData.socialMedia}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-400">Upload Image</label>
          <input
            type="file"
            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
