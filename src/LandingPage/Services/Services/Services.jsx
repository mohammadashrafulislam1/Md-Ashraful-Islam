import React, { useState } from 'react';
import Development from '../Development/Development';
import SEO from '../SEO/SEO';
import Design from '../Design/Design';

const Services = () => {
  const [showDevelopment, setShowDevelopment] = useState(true);
  const [showSEO, setShowSEO] = useState(false);
  const [showDesign, setShowDesign] = useState(false);

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

  return (
    <div className='my-16'>
    <h6 className="text-white text-2xl mb-5">Services --</h6>
    <div className="md:grid grid-cols-2 md:gap-20 items-center">
      <div>
        <div
          className={`flex justify-center items-center bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl gap-5 p-5 mb-5 cursor-pointer ${showDevelopment ? 'border border-blue-500' : ''}`}
          onClick={handleDevelopmentClick}
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
        >
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/graphic-design-6332596-5220374.png" alt="" className="w-[100px]" />
          <div>
            <h6 className="text-white text-xl font-semibold">WEB DESIGN</h6>
            <p className="text-[#616161]">Familiar with web design and designing tools</p>
          </div>
        </div>
      </div>

      <div className='mt-10 md:mt-0'>
        {showDevelopment && <Development />}
        {showSEO && <SEO />}
        {showDesign && <Design />}
      </div>
    </div>
    </div>
  );
};

export default Services;
