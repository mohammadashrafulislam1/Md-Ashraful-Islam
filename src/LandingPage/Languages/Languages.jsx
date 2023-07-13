import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./Languages.css"
const Languages = () => {  
   
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: {
      perView: 4,
      spacing: 15,
    
    },
  })
  return (
    
    <div className="my-24">
      <h6 className="text-white text-2xl mb-5">Languages --</h6>
      <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide number-slide1 flex flex-wrap md:gap-5"><img src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png" className="w-[40px] rounded-lg" alt="" />
      <p className="text-xs md:text-lg">REACT.JS</p>
      </div>
      <div className="keen-slider__slide number-slide2 flex flex-wrap md:gap-5" ><img src="https://logospng.org/download/javascript/logo-javascript-icon-1024.png" className="w-[40px] rounded-lg" alt="" />
      <p className="text-xs md:text-lg">JAVASCRIPT</p></div>
      <div className="keen-slider__slide number-slide3 flex flex-wrap md:gap-5" ><img src="https://cdn-icons-png.flaticon.com/512/1532/1532556.png" className="w-[40px] rounded-lg" alt="" />
      <p className="text-xs md:text-lg">HTML</p></div>
      <div className="keen-slider__slide number-slide4 flex flex-wrap md:gap-5" ><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/800px-CSS3_logo.svg.png" className="w-[40px] rounded-lg" alt="" />
      <p className="text-xs md:text-lg">CSS</p></div>
      <div className="keen-slider__slide number-slide5 flex flex-wrap md:gap-5" ><img src="https://cdn-icons-png.flaticon.com/512/919/919825.png" className="w-[40px] rounded-lg" alt="" />
      <p className="text-xs md:text-lg">NODE.JS</p></div>
      <div className="keen-slider__slide number-slide6 flex flex-wrap md:gap-5" ><img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png" className="w-[40px] rounded-lg" alt="" />
      <p className="text-xs md:text-lg">EXPRESS.JS</p></div>
      <div className="keen-slider__slide number-slide2 flex flex-wrap md:gap-5" ><img src="https://i.ibb.co/pxQtbQj/pngaaa-com-7721369.png" className="w-[40px] rounded-lg" alt="" />
      <p className="text-xs md:text-lg">MONGODB</p></div>
    </div>
 
    </div>
  );
};

export default Languages;
