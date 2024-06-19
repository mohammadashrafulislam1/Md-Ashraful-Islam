import React, { useState, useEffect } from 'react';
import { endPoint } from "../../forAll/forAll";
import { Container, Box, Typography, Card, CardContent, Avatar, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './TestimonialSection.css'; 

const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${endPoint}/testimonial`);
        const data = await response.json();
        setTestimonials(data.filter(testimonial => testimonial.isActive));
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

  const handleSeeMore = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const handleClose = () => {
    setSelectedTestimonial(null);
  };

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 4 }} className="mb-5">
        testimonial section_
      </Typography>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        centerMode
        centerSlidePercentage={33.33}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button type="button" onClick={onClickHandler} title={label} className="custom-arrow custom-prev">
              <FaArrowLeft />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button type="button" onClick={onClickHandler} title={label} className="custom-arrow custom-next">
              <FaArrowRight />
            </button>
          )
        }
      >
        {testimonials.map((testimonial, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'center', p: 2, borderRadius:'20px' }}>
            <Card sx={{ maxWidth: 360, textAlign: 'center', p: 2, boxShadow: 3, borderRadius:'20px' }}>
              <Avatar
                alt={testimonial.name}
                src={testimonial.image}
                sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                  {testimonial.des}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {truncateText(testimonial.testimonial, 100)}
                </Typography>
                <Button onClick={() => handleSeeMore(testimonial)}>See More</Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Carousel>

      {selectedTestimonial && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              {selectedTestimonial.name}
            </Typography>
            <Avatar
              alt={selectedTestimonial.name}
              src={selectedTestimonial.image}
              sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }}
            />
            <Typography variant="body1" component="div" sx={{ mb: 2 }}>
              {selectedTestimonial.des}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedTestimonial.testimonial}
            </Typography>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default TestimonialSection;
