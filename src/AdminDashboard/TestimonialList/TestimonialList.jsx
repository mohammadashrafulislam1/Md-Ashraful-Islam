import { useEffect, useState } from 'react';
import { endPoint } from '../../forAll/forAll';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`/${endPoint}/testimonial`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching testimonials: {error.message}</div>;
  }

  return (
    <div>
      <h1>Testimonials</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Testimonial</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Social Media</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial._id}>
              <td><img src={testimonial.image} alt={testimonial.name} width="50" height="50" /></td>
              <td>{testimonial.name}</td>
              <td>{testimonial.email}</td>
              <td>{testimonial.testimonial}</td>
              <td>{testimonial.rating}</td>
              <td>{testimonial.des}</td>
              <td>{testimonial.socialMedia}</td>
              <td>{testimonial.isActive ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialList;
