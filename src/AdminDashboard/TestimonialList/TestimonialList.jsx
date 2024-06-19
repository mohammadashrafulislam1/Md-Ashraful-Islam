import React, { useState, useEffect } from 'react';
import { endPoint } from '../../forAll/forAll';
import Swal from 'sweetalert2';
import './Testimonial.css';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${endPoint}/testimonial`);
        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleDeleteTestimonial = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/${endPoint}/testimonial/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            setTestimonials(testimonials.filter(testimonial => testimonial._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your testimonial has been deleted.",
              icon: "success"
            });
          } else {
            throw new Error("Failed to delete testimonial");
          }
        } catch (error) {
          console.error('Error deleting testimonial:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete testimonial.",
            icon: "error"
          });
        }
      }
    });
  };

  const handleUpdateTestimonial = async (id) => {
    try {
      const testimonialToUpdate = testimonials.find(testimonial => testimonial._id === id);
      const updatedTestimonial = { ...testimonialToUpdate, isActive: !testimonialToUpdate.isActive };

      const response = await fetch(`/${endPoint}/testimonial/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTestimonial)
      });

      if (response.ok) {
        setTestimonials(testimonials.map(testimonial =>
          testimonial._id === id ? { ...testimonial, isActive: updatedTestimonial.isActive } : testimonial
        ));
        Swal.fire({
          title: "Updated!",
          text: "Testimonial status updated successfully.",
          icon: "success"
        });
      } else {
        throw new Error("Failed to update testimonial");
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update testimonial.",
        icon: "error"
      });
    }
  };

  return (
    <div className="testimonial-list-container text-white">
      {loading ? (
        <div className="text-center m-60 flex justify-center items-center gap-4">
          <span>Loading... </span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : error ? (
        <div>Error fetching testimonials: {error.message}</div>
      ) : (
        <>
          <h2 className='text-white text-3xl text-center my-5'>Testimonials</h2>
          <div className="table-container">
            {testimonials.length > 0 ? (
              <table className="table">
                <thead>
                  <tr className='text-white'>
                    <th>No</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Testimonial</th>
                    <th>Rating</th>
                    <th>Description</th>
                    <th>Social Media</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial, index) => (
                    <tr key={testimonial._id}>
                      <td>{index + 1}</td>
                      <td><img src={testimonial.image} alt={testimonial.name} width="30" height="30" /></td>
                      <td>{testimonial.name}</td>
                      <td>{testimonial.email}</td>
                      <td>{testimonial.testimonial}</td>
                      <td>{testimonial.rating}</td>
                      <td>{testimonial.des}</td>
                      <td><a href={testimonial.socialMedia} target='_blank' rel="noopener noreferrer">Social</a></td>
                      <td>
                        {testimonial.isActive ? (
                          <button className="btn bg-blue-700 border-0 text-white btn-xs hover:bg-black" onClick={() => handleUpdateTestimonial(testimonial._id)}>
                            Deactivate
                          </button>
                        ) : (
                          <button className="btn btn-warning text-white btn-xs" onClick={() => handleUpdateTestimonial(testimonial._id)}>
                            Activate
                          </button>
                        )}
                      </td>
                      <td>
                        <button className="btn btn-success text-white btn-xs mb-2 mr-1" onClick={() => handleUpdateTestimonial(testimonial._id)}>Update</button>
                        <button className="btn btn-error text-white btn-xs" onClick={() => handleDeleteTestimonial(testimonial._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">No testimonials found.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TestimonialList;
