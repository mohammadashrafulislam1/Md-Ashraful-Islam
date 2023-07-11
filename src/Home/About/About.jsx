import { FaArrowRight } from "react-icons/fa";

const About = () => {
    return (
    <div className="bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl md:py-10 md:px-16 p-10 mb-5 md:mb-0">
          <img src="https://i.ibb.co/D9szksx/output-onlinegiftools.gif" alt="" /> 
        <div className="flex items-end justify-between">
           <div className="pt-11">
           <p className="text-[#818181]">MORE ABOUT ME</p>
           <h6 className="text-white text-xl">Credentials</h6>
           </div>
           <button><FaArrowRight className='text-[#2d2d2d] hover:text-white'></FaArrowRight> </button> 
        </div> 
    </div>
    );
};

export default About;