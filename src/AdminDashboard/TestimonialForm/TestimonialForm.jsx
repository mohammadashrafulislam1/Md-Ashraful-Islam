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
    isActive: true
  });
  console.log(formData)

  const [imageUpload, setImageUpload] = useState({
    imageUrl: '',
    loading: false
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
      const response = await fetch(imgHostingUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();

      if (data && data.data && data.data.url) {
        setImageUpload({ imageUrl: data.data.url, loading: false });
        setFormData(prevData => ({ ...prevData, image: data.data.url }));
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
        title: 'Error',
        text: 'Failed to upload image. Please try again later.',
        icon: 'error'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the image upload is complete before submitting
    if (imageUpload.loading) {
      Swal.fire({
        title: 'Please wait',
        text: 'Image is still uploading. Please wait for it to finish.',
        icon: 'warning'
      });
      return;
    }

    try {
      const response = await fetch(`${endPoint}/testimonial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Testimonial submitted successfully!',
          icon: 'success'
        });
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
        setImageUpload({ imageUrl: '', loading: false });
      } else {
        throw new Error('Failed to submit testimonial');
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit testimonial. Please try again later.',
        icon: 'error'
      });
    }
  };

  return (
    <div className="w-full md:w-3/4 mx-auto p-10">
      <h2 className="md:text-3xl font-bold my-6 text-center text-white text-2xl">Testimonial Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label htmlFor="image" className="block text-gray-200 text-sm font-bold mb-2">
            Client Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="name" className="block text-gray-200 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="testimonial" className="block text-gray-200 text-sm font-bold mb-2">
            Testimonial:
          </label>
          <textarea
            id="testimonial"
            name="testimonial"
            value={formData.testimonial}
            onChange={handleChange}
            required
            rows="6"
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="rating" className="block text-gray-200 text-sm font-bold mb-2">
            Rating:
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="des" className="block text-gray-200 text-sm font-bold mb-2">
            Description:
          </label>
          <input
            type="text"
            id="des"
            name="des"
            value={formData.des}
            onChange={handleChange}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="socialMedia" className="block text-gray-200 text-sm font-bold mb-2">
            Social Media:
          </label>
          <input
            type="text"
            id="socialMedia"
            name="socialMedia"
            value={formData.socialMedia}
            onChange={handleChange}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="number-slide1 text-white py-3 px-4 hover:bg-blue-600 w-full my-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
