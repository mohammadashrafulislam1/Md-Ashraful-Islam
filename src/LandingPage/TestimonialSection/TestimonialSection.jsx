import React, { useState, useEffect } from 'react';
import { endPoint } from "../../forAll/forAll";
import { Box, Typography, Card, CardContent, Avatar, Button, Rating } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './TestimonialSection.css'; 

const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};
const backgrounds = [
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718897997/ashrafulislampersonalwebsite/m9vfm64pvdagunstxhsc.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718927495/ashrafulislampersonalwebsite/bipqvsn9hj0revn3pbm6.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718943182/ashrafulislampersonalwebsite/pink.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718943658/ashrafulislampersonalwebsite/green.png'
];

const hoverBackgrounds = [
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718927056/ashrafulislampersonalwebsite/jlowho01qdlxrjswa2kt.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718927494/ashrafulislampersonalwebsite/golden-hover.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718943181/ashrafulislampersonalwebsite/pink-hover.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718943658/ashrafulislampersonalwebsite/green-hover.png',
];
const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  console.log(testimonials)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
  const handleCardMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleCardMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="bg-[#0e0c15] containerTest">
      <Typography variant="h1" sx={{ mb: 4 }} className="mb-5">
        testimonial section_
      </Typography>
      <Carousel
        showThumbs={false}
        showStatus={false}
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
            <div style={{ maxWidth: 326, maxHeight:300, textAlign: 'left', p: 2, borderRadius:'20px',
                backgroundImage: `url(${hoveredIndex === index ? hoverBackgrounds[index % hoverBackgrounds.length] : backgrounds[index % backgrounds.length]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width:'326px',
                height:'300px',
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                backgroundRepeat:'no-repeat' }}
                onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={handleCardMouseLeave}>
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
            </div>
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
            <Typography component="legend">Ratings</Typography>
            <Rating name="half-rating" defaultValue={selectedTestimonial.rating} precision={selectedTestimonial.rating} />
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
