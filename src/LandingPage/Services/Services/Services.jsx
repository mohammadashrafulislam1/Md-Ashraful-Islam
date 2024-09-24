import React, { useState, useEffect } from 'react';
import Development from '../Development/Development';
import SEO from '../SEO/SEO';
import Design from '../Design/Design';
import ScrambleText from '../../../forAll/ScrambleText';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Services = () => {
  const [showDevelopment, setShowDevelopment] = useState(true);
  const [showSEO, setShowSEO] = useState(false);
  const [showDesign, setShowDesign] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [showDevelopment, showSEO, showDesign]);

  const handleDevelopmentClick = () => {
    setShowDevelopment(true);
    setShowSEO(false);
    setShowDesign(false);
  };

  const handleSEOClick = () => {
    setShowDevelopment(false);
    setShowSEO(true);
    setShowDesign(false);
  };

  const handleDesignClick = () => {
    setShowDevelopment(false);
    setShowSEO(false);
    setShowDesign(true);
  };

  const texts = ['service_', 'offerings_', 'what we do_'];

  return (
    <div className="my-16">
      <h1 className="mb-5 section-title">
        <ScrambleText texts={texts} />
      </h1>
      <div className="md:grid grid-cols-2 md:gap-20 items-center z-20">
        <div>
          <div
            className={`flex justify-center items-center bg-gradient-to-r from-[#212121] to-[#111111] z-10 rounded-3xl gap-5 p-5 mb-5 cursor-pointer ${showDevelopment ? 'border border-blue-500' : ''}`}
            onClick={handleDevelopmentClick}
            data-aos="zoom-in"
          >
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/male-programmer-5743382-4846824.png" alt="" className="w-[100px]" />
            <div>
              <h6 className="text-white text-xl font-semibold">Full Stack Development</h6>
              <p className="text-[#616161]">Professional front-end and back-end developer.</p>
            </div>
          </div>

          <div
            className={`flex justify-center items-center bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl gap-5 p-5 cursor-pointer ${showSEO ? 'border border-blue-500' : ''}`}
            onClick={handleSEOClick}
            data-aos="flip-left"
          >
            <img src="https://static.vecteezy.com/system/resources/previews/008/506/577/original/3d-seo-search-engine-optimization-concept-png.png" alt="" className="w-[100px]" />
            <div>
              <h6 className="text-white text-xl font-semibold">SEO OPTIMIZATION</h6>
              <p className="text-[#616161]">Have experience in search engine optimization.</p>
            </div>
          </div>

          <div
            className={`flex justify-center items-center bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl gap-5 p-5 mt-5 cursor-pointer ${showDesign ? 'border border-blue-500' : ''}`}
            onClick={handleDesignClick}
            data-aos="fade-right"
          >
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/graphic-design-6332596-5220374.png" alt="" className="w-[100px]" />
            <div>
              <h6 className="text-white text-xl font-semibold">WEB DESIGN</h6>
              <p className="text-[#616161]">Familiar with web design and designing tools</p>
            </div>
          </div>
        </div>

        <div className='mt-10 md:mt-0'>
          {showDevelopment && (
            <div data-aos="fade-up">
              <Development />
            </div>
          )}
          {showSEO && (
            <div data-aos="fade-up">
              <SEO />
            </div>
          )}
          {showDesign && (
            <div data-aos="fade-up">
              <Design />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
