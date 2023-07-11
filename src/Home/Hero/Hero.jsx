import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
    return (
        <div className="bg-gradient-to-r from-[#212121] to-[#111111] py-10 px-16 flex items-end justify-between gap-5 rounded-3xl">
       <img src="https://i.ibb.co/R4qnm4G/20220902-193517.png" className="h-[150px] w-[150px]" alt="" />  
       <div>
        <p className="text-[#818181]">MERN STACK WEB DEVELOPER</p>
        <h1 className="text-white text-4xl font-semibold">MD ASHRAFUL <br /> ISLAM</h1>
        <p className="text-[#818181]">I am a full stack web developer. [MERN]</p>
      </div>  
      <FaArrowRight className='text-white'></FaArrowRight>
        </div>
    );
};

export default Hero;