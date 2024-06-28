import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="bg-gradient-to-r from-[#212121] to-[#111111] md:py-10 md:px-16 md:flex items-end justify-between gap-5 rounded-3xl mb-5 p-10 md:mb-0" style={{ animation: 'borderAnimation 2s infinite' }}>
       <img src="https://i.ibb.co/R4qnm4G/20220902-193517.png" className="h-[150px] w-[150px]" alt="" />  
    <div className='flex items-end gap-5'>
    <div>
        <p className="text-[#818181]">MERN STACK WEB DEVELOPER</p>
        <h1 className="text-white text-4xl font-semibold">MD ASHRAFUL <br /> ISLAM</h1>
        <p className="text-[#818181]">I am a full stack web developer. [MERN]</p>
      </div>  
    <Link to='landing-page'>
    <button><FaArrowRight className='text-[#2d2d2d] hover:text-white'></FaArrowRight> </button> 
    </Link>
    </div>
        </div>
    );
};

export default Hero;