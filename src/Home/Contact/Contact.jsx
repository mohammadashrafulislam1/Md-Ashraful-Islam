import { FaArrowRight } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl md:py-10 md:px-16 p-10 relative">
        <img src="https://i.ibb.co/j3LW4t6/kisspng-lamp-lighting-kitchen-edison-screw-pendant-vector-5adac4d5d46c17-4125078915242866778701.png" className='h-[100px] w-[90px] absolute top-0 left-10 pl-[9px]' alt="" />
        <img src="https://i.ibb.co/Fsb2KmW/Pngtree-light-effect-photography-light-stage-7275697.png" className='absolute left-10 h-[140px] w-[100px] top-20 pt-2 opacity-10 hover:opacity-30' alt="" />
      <div className="flex items-end justify-between gap-6 z-10">
         <div className="pt-16">
         <h2 className='text-white text-5xl'>
            <span className='text-blue-600'>Let's</span> <br />
            Work Together
         </h2>
         </div>
         <button><FaArrowRight className='text-[#2d2d2d] hover:text-white'></FaArrowRight> </button>  
      </div> 
  </div>
    );
};

export default Contact;