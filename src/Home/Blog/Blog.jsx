import { FaArrowRight } from "react-icons/fa";

const Blog = () => {

    return (
        <div className="bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl md:py-10 md:px-16 p-10">
          <img src="https://www.mweb.im/asset/img/logo.png" className='h-[80px] w-[80px] ml-5' alt="" /> 
        <div className="flex items-end justify-between">
           <div className="pt-11">
           <p className="text-[#818181]">Learn from me</p>
           <h6 className="text-white text-xl">Blog</h6>
           </div>
           <button><FaArrowRight className='text-[#2d2d2d] hover:text-white'></FaArrowRight> </button>  
        </div> 
    </div>
    );
};

export default Blog;