import { FaArrowRight } from "react-icons/fa";

const Projects = () => {
    return (
        <div className="bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl md:py-10 md:px-16 p-10">
          <img src="https://i.ibb.co/G35QFz1/fadc7785-a45d-4b15-abcc-d723705264c6.gif" alt=""/> 
        <div className="flex items-end justify-between">
           <div className="pt-7">
           <p className="text-[#818181]">SHOWCASE</p>
           <h6 className="text-white text-xl">Projects</h6>
           </div>
           <button><FaArrowRight className='text-[#2d2d2d] hover:text-white'></FaArrowRight> </button> 
        </div> 
    </div>
    );
};

export default Projects;