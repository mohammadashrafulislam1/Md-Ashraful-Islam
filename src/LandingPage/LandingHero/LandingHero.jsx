import { FaCircle } from "react-icons/fa";
import '../../Home/ShareCss/ShareCss.css'
import { TypeAnimation } from "react-type-animation";
import { useEffect } from "react";

const LandingHero = () => {
    const handleDownloadClick = () => {
      // Replace the Google Drive link with your own CV link
      const cvLink = 'https://drive.google.com/file/d/1Vg-rBg3YDWzXS9xHnMSqGQU67uBC1SHh/view?usp=sharing';
      window.location.href = cvLink;
    };
  
    useEffect(() => {
      handleDownloadClick(); // Call the download function immediately after the component mounts
    }, []);
  return (
    <div className="md:flex items-center justify-center relative md:mt-0 mt-6">
      {/* left side */}
      <div>
        <div className="bg-gradient-to-r from-[#111111] to-[#212121] rounded-r-full p-4">
          <h6 className="text-blue-700 flex items-center gap-3 text-[18px]">
            <FaCircle className="text-[10px]" />
            Full stack
          </h6>
          <p className="text-[12px] text-[#c4c4c4]">Web developer</p>
        </div>
        <div className="bg-gradient-to-r from-[#111111] to-[#212121] rounded-r-full p-4 md:mt-10 mt-3">
          <h6 className="text-gray-400 flex items-center gap-3 text-[18px]">
            <FaCircle className="text-[10px]" />
            Say hello to
          </h6>
          <p className="text-[12px] text-white">mohammadashrafulislam33@gmail.com</p>
        </div>
      </div>
      {/* middle side */}
        <div className="text-center">
          <img
            src="https://i.ibb.co/XLZZBJh/20220902-193547.png"
            alt=""
            className=""
          />
        <h1 className="text-white text-5xl font-semibold mt-0">MD Ashraful Islam</h1>
        <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'Experience in REACT.JS',
    1000,
    'Experience in MONGODB',
    1000,
    'Experience in NODE.JS',
    1000,
    'Experience in Expres.JS',
    1000,
    'Experience in JAVASCRIPT',
    1000,
    'Experience in HTML',
    1000,
    'Experience in CSS',
    1000,
    'Experience in WORDPRESS',
    1000,
    'Experience in TAILWIND',
    1000,
    'Experience in BOOTSTRAP',
    1000,
  ]}
  speed={50}
  style={{ fontSize: '16px', color: "wheat" }}
  repeat={Infinity}
  />
 <p className="text-gray-300">Want to see my CV? <button className="btn btn-link text-blue-500" onClick={handleDownloadClick}>
        Download CV
      </button></p>
        </div>
      {/* Right side */}
      <div>
        <div className="border-b border-[#c4c4c448] pb-4 md:text-end text-center md:mt-0 mt-10">
          <h6 className="text-white text-xl">100%</h6>
          <p className="text-[#c4c4c4]">Client Satisfaction</p>
        </div>
        <div className="border-b border-[#c4c4c448] pb-4 md:text-end text-center my-10">
          <h6 className="text-white text-xl">10+</h6>
          <p className="text-[#c4c4c4]">Completed Projects</p>
        </div>
        <div className="pb-4 md:text-end text-center">
          <h6 className="text-white text-xl">2+</h6>
          <p className="text-[#c4c4c4]">Years Experience</p>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
