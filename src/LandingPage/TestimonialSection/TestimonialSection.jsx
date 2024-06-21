import React, { useState, useEffect } from 'react';
import { endPoint } from "../../forAll/forAll";
import { Container, Box, Typography, Card, CardContent, Avatar, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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
    <div className="bg-[#0e0c15] containerTest">
      <Typography variant="h1" sx={{ mb: 4 }} className="mb-5">
        testimonial section_
      </Typography>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        centerMode
        centerSlidePercentage={28}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button type="button" onClick={onClickHandler} title={label} className="custom-arrow custom-prev">
              <FaAngleLeft />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button type="button" onClick={onClickHandler} title={label} className="custom-arrow custom-next">
              <FaAngleRight />
            </button>
          )
        }
      >
        {testimonials.map((testimonial, index) => (
          <Box key={index}
           sx={{ display: 'flex', justifyContent: 'center', p: 2, borderRadius:'20px' }} className="text-white">
            <Card className={`testimonial-card card-${index}`} sx={{ maxWidth: 326, maxHeight:300, textAlign: 'left', p: 2, borderRadius:'20px' }}>
              <CardContent className="text-white">
              <Typography variant="h6" component="Card" sx={{ mb: 2 }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="p" className='font-light text-[14px]' component="div" sx={{ mb: 2 }}>
                  {testimonial.des}
                </Typography>
                <p className="text-white font-thin testimonial-p">
                  {truncateText(testimonial.testimonial, 100)}
                </p>
              </CardContent>
              <div className='flex justify-between pb-4 px-4'>
              <Avatar
                alt={testimonial.name}
                src={testimonial.image}
                sx={{ width: 46, height: 46, mx: 'auto', mb: 2 }}
                className="margin-0"
              />
              <button onClick={() => handleSeeMore(testimonial)} className='flex text-white gap-1 items-center'>See More <FaAngleRight></FaAngleRight></button>
              </div>
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
    </div>
  );
};

export default TestimonialSection;
