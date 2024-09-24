import React, { useState, useEffect } from 'react';
import { endPoint } from "../../forAll/forAll";
import { Box, Typography, CardContent, Avatar } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { FaAngleLeft, FaAngleRight, FaRegStar, FaStar } from 'react-icons/fa';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'aos/dist/aos.css'; // Import AOS styles
import './TestimonialSection.css';
import Rating from 'react-rating';
import { useMediaQuery } from 'react-responsive';
import ScrambleText from '../../forAll/ScrambleText';
import AOS from 'aos'; // Import AOS

const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

const backgrounds = [
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718897997/ashrafulislampersonalwebsite/blue.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718927495/ashrafulislampersonalwebsite/golden.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718943182/ashrafulislampersonalwebsite/pink.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718943658/ashrafulislampersonalwebsite/green.png'
];

const hoverBackgrounds = [
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718927056/ashrafulislampersonalwebsite/blue-hover.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718927494/ashrafulislampersonalwebsite/golden-hover.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718943181/ashrafulislampersonalwebsite/pink-hover.png',
  'https://res.cloudinary.com/dajqmaltl/image/upload/v1718943658/ashrafulislampersonalwebsite/green-hover.png',
];

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Media queries
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  let centerSlidePercentage = 28;
  let cardClass = 'testimonial-card desktop';
  if (isMobile) {
    centerSlidePercentage = 100;
    cardClass = 'testimonial-card mobile';
  } else if (isTabletOrMobile) {
    centerSlidePercentage = 50;
    cardClass = 'testimonial-card mobile';
  }

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
    AOS.init({ duration: 1000 }); // Initialize AOS with desired duration
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

  const texts = ['testimonials_', 'reviews_', 'what my clients saying_'];
  return (
    <div className="bg-[#0e0c15] containerTest" data-aos="fade-up">
      <h1 className="mb-5 section-title">
        <ScrambleText texts={texts} />
      </h1>
      <Carousel
        showThumbs={false}
        showStatus={false}
        useKeyboardArrows
        centerMode
        centerSlidePercentage={centerSlidePercentage}
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
          <Box
            key={index}
            sx={{ display: 'flex', justifyContent: 'center', p: 2, borderRadius: '20px' }}
            className="text-white"
            data-aos="zoom-in"
          >
            <div
              className={cardClass}
              style={{
                backgroundImage: `url(${hoveredIndex === index ? hoverBackgrounds[index % hoverBackgrounds.length] : backgrounds[index % backgrounds.length]})`
              }}
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={handleCardMouseLeave}
            >
              <CardContent className="text-white">
                <Typography variant="h6" component="Card" sx={{ mb: 2 }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="p" className="font-light text-[14px]" component="div" sx={{ mb: 2 }}>
                  {testimonial.des}
                </Typography>
                <p className="text-white font-thin testimonial-p">
                  {truncateText(testimonial.testimonial, 100)}
                </p>
              </CardContent>
              <div className="flex justify-between pb-4 px-4">
                <Avatar
                  alt={testimonial.name}
                  src={testimonial.image}
                  sx={{ width: 46, height: 46, mx: 'auto', mb: 2 }}
                  className="margin-0"
                />
                <button onClick={() => handleSeeMore(testimonial)} className="flex text-white gap-1 items-center">See More <FaAngleRight /></button>
              </div>
            </div>
          </Box>
        ))}
      </Carousel>

      {selectedTestimonial && (
        <div className="modal-overlay" onClick={handleClose} data-aos="fade-in">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="bg-over">
              <div className="flex justify-center gap-5">
                <Avatar
                  alt={selectedTestimonial.name}
                  src={selectedTestimonial.image}
                  sx={{ width: 70, height: 70, mb: 2 }}
                />
                <div className="flex flex-col gap-0 ">
                  <h6 style={{ mb: 2, fontWeight: '700' }} className="mb-0 text-xl">
                    {selectedTestimonial.name}
                  </h6>
                  <p style={{ mb: 2, fontWeight: '300' }}>
                    {selectedTestimonial.des}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 my-4 justify-between items-center">
                <div className="flex gap-2 my-4 justify-center">
                  <Typography component="legend">Ratings</Typography>
                  <Rating
                    initialRating={selectedTestimonial.rating}
                    emptySymbol={<FaRegStar />}
                    fullSymbol={<FaStar />}
                    readonly
                    className="text-xl text-[#fe0]"
                  />
                </div>
                <a target="_blank" href={selectedTestimonial.socialMedia}><button className="btn btn-sm">Social</button></a>
              </div>
              <Typography variant="body2" className="testimonial-p mb-10">
                {selectedTestimonial.testimonial}
              </Typography>
              <button onClick={handleClose} className="absolute top-5 right-5">x</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialSection;
