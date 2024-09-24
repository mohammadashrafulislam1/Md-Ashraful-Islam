import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Languages.css'; // Adjust the path as needed
import { Typography } from '@mui/material';
import ScrambleText from '../../forAll/ScrambleText';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Languages = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const languageItems = [
    { name: 'REACT.JS', imageUrl: 'https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png', gradientStart: 'rgba(64, 175, 255, 0.247)', gradientEnd: 'rgba(63, 98, 255, 0.247)' },
    { name: 'JAVASCRIPT', imageUrl: 'https://logospng.org/download/javascript/logo-javascript-icon-1024.png', gradientStart: 'rgba(255, 153, 63, 0.247)', gradientEnd: 'rgba(255, 75, 64, 0.247)' },
    { name: 'HTML', imageUrl: 'https://cdn-icons-png.flaticon.com/512/1532/1532556.png', gradientStart: 'rgba(182, 255, 64, 0.247)', gradientEnd: 'rgba(63, 255, 71, 0.247)' },
    { name: 'CSS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png', gradientStart: 'rgba(64, 255, 242, 0.247)', gradientEnd: 'rgba(63, 188, 255, 0.247)' },
    { name: 'NODE.JS', imageUrl: 'https://cdn-icons-png.flaticon.com/512/919/919825.png', gradientStart: 'rgba(255, 64, 156, 0.247)', gradientEnd: 'rgba(255, 63, 63, 0.247)' },
    { name: 'EXPRESS.JS', imageUrl: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png', gradientStart: 'rgba(64, 76, 255, 0.247)', gradientEnd: 'rgba(174, 63, 255, 0.247)' },
    { name: 'MONGODB', imageUrl: 'https://i.ibb.co/pxQtbQj/pngaaa-com-7721369.png', gradientStart: 'rgba(64, 175, 255, 0.247)', gradientEnd: 'rgba(63, 98, 255, 0.247)' }, // Example: Reusing gradientStart and gradientEnd
  ];

  const texts = ['languages_', 'skills_', 'technologies_'];

  return (
    <div className="my-24 containerTest" data-aos="fade-up">
      <h1 className="mb-5 section-title">
        <ScrambleText texts={texts} />
      </h1>
      <Carousel
        showThumbs={false}
        showStatus={false}
        useKeyboardArrows
        centerMode
        centerSlidePercentage={28} // Adjust as needed
        
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
        {languageItems.map((item, index) => (
          <div
            key={index}
            className=" md:flex gap-4 mx-[30px!important]"
            style={{
              backgroundImage: `linear-gradient(128deg, ${item.gradientStart} 0%, ${item.gradientEnd} 100%)`,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#fff',
              fontWeight: 500,
              borderRadius: '20px',
              padding: '15px',
              maxWidth:'350px',
              width:'100%',
              backdropFilter: 'blur(10px)',
            }}
            data-aos="fade-up"
          >
            <img src={item.imageUrl} className="w-[40px!important] rounded-lg" alt={item.name} />
            <Typography variant="body2" className="text-xs md:text-lg">
              {item.name}
            </Typography>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Languages;
