import { FaArrowRight } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-[#202020] p-5 flex items-center justify-between gap-5 rounded-3xl">
       <img src="https://i.ibb.co/R4qnm4G/20220902-193517.png" className="h-[200px] w-[200px]" alt="" />  
       <div>
        <p className="text-[#818181]">MERN STACK WEB DEVELOPER</p>
        <h1 className="text-white text-5xl font-semibold">MD ASHRAFUL ISLAM</h1>
        <p className="text-[#818181]">I am a full stack web developer. [MERN]</p>
      </div>  
      <FaArrowRight className='text-white'></FaArrowRight>
        </div>
    );
};

export default About;