import { FaArrowRight } from "react-icons/fa";

const Projects = () => {
    return (
        <div className="bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl py-10 px-16">
          <img src="https://i.ibb.co/G35QFz1/fadc7785-a45d-4b15-abcc-d723705264c6.gif" alt="" /> 
        <div className="flex items-end justify-between">
           <div className="pt-7">
           <p className="text-[#818181]">MORE ABOUT ME</p>
           <h6 className="text-white text-xl">Credentials</h6>
           </div>
           <FaArrowRight className='text-white'></FaArrowRight>  
        </div> 
    </div>
    );
};

export default Projects;