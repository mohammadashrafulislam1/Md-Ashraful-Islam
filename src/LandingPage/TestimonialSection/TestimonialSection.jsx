import React, { useState, useEffect } from 'react';
import { endPoint } from "../../forAll/forAll";
import { Container, Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const TestimonialSection = () => {
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

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">Error loading testimonials</Typography>;
  }

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 4 }} className="mb-5">
        testimonial section_
      </Typography>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay>
        {testimonials.map((testimonial, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Card sx={{ maxWidth: 345, textAlign: 'center', p: 2, boxShadow: 3 }}>
              <Avatar
                alt={testimonial.name}
                src={testimonial.image}
                sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="p" component="div" sx={{ mb: 2 }}>
                  {testimonial.des}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
};

export default TestimonialSection;
