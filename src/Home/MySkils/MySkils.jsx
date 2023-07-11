import { FaArrowRight } from 'react-icons/fa';

const MySkills = () => {
    return (
        <div className="bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl md:py-10 md:px-16 p-10 my-5 md:my-0">
          <div className='bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl grid grid-cols-4 p-4 md:gap-6 gap-6'>

        <img src="https://i.ibb.co/X7xcmR7/pngaaa-com-2507897-1.png" className='w[60px] h-[60px]' alt="" />

        <img src="https://i.ibb.co/2syHqyC/pngaaa-com-4547668.png" className='w[60px] h-[60px]' alt="" />

        <img src="https://i.ibb.co/pxQtbQj/pngaaa-com-7721369.png" className='w[60px] h-[60px]' alt="" />

        <img src="https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/8d565/express-js.webp" className='w[60px] h-[60px]' alt="" />

          </div>
        <div className="flex items-end justify-between">
           <div className="pt-11">
           <p className="text-[#818181]">Click arrow to find more</p>
           <h6 className="text-white text-xl">My Skills</h6>
           </div>
           <button><FaArrowRight className='text-[#2d2d2d] hover:text-white'></FaArrowRight> </button>  
        </div> 
    </div>
    );
};

export default MySkills;