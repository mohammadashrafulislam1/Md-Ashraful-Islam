import { FaArrowRight, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';


const Socials = () => {
    return (
        <div className="bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl md:py-10 md:px-16 p-10" style={{ animation: 'borderAnimation 2s infinite' }}>
        <div className='bg-gradient-to-r from-[#212121] to-[#111111] rounded-3xl flex p-4 gap-5 text-white border-animation'>

      <div className='bg-[#292929] p-5 rounded-full '>
        <FaGithub className='w-[30px] h-[30px]'></FaGithub>
      </div>

      <div className=' p-5 bg-[#292929] rounded-full'>
        <FaLinkedinIn className='w-[30px] h-[30px]'></FaLinkedinIn>
      </div>

      <div className=' p-5 bg-[#292929] rounded-full'>
        <FaFacebookF className='w-[30px] h-[30px]'></FaFacebookF>
      </div>
        </div>
      <div className="flex items-end justify-between">
         <div className="pt-11">
         <p className="text-[#818181]">Follow me on social media</p>
         <h6 className="text-white text-xl">Socials</h6>
         </div>
         <button><FaArrowRight className='text-[#2d2d2d] hover:text-white'></FaArrowRight> </button> 
      </div> 
  </div>
    );
};

export default Socials;