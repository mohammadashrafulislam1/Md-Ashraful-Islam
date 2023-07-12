import { useState } from "react";
import './Languages.css'
const Languages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const languages = [
    { id: 1, name: "JavaScript", url: "https://i.ibb.co/xqtSqnb/kisspng-javascript-html-computer-software-web-browser-watermark-5acdbd5508ada4-437525501523432789035.png" },
    { id: 2, name: "Python", url: "https://i.ibb.co/xqtSqnb/kisspng-javascript-html-computer-software-web-browser-watermark-5acdbd5508ada4-437525501523432789035.png" },
    { id: 3, name: "Java", url: "https://i.ibb.co/xqtSqnb/kisspng-javascript-html-computer-software-web-browser-watermark-5acdbd5508ada4-437525501523432789035.png" },
    { id: 4, name: "C++", url: "https://i.ibb.co/xqtSqnb/kisspng-javascript-html-computer-software-web-browser-watermark-5acdbd5508ada4-437525501523432789035.png" },
    { id: 5, name: "Ruby", url: "https://i.ibb.co/xqtSqnb/kisspng-javascript-html-computer-software-web-browser-watermark-5acdbd5508ada4-437525501523432789035.png" },
    { id: 6, name: "Rkk", url: "https://i.ibb.co/xqtSqnb/kisspng-javascript-html-computer-software-web-browser-watermark-5acdbd5508ada4-437525501523432789035.png" },
    { id: 7, name: "CSS", url: "https://i.ibb.co/xqtSqnb/kisspng-javascript-html-computer-software-web-browser-watermark-5acdbd5508ada4-437525501523432789035.png" },
    { id: 8, name: "HTML", url: "https://i.ibb.co/xqtSqnb/kisspng-javascript-html-computer-software-web-browser-watermark-5acdbd5508ada4-437525501523432789035.png" },
  ];

  const handlePrev = () => {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
    setTranslateValue(translateValue + 100);
  };

  const handleNext = () => {
    if (activeIndex === languages.length - 4) return;
    setActiveIndex(activeIndex + 1);
    setTranslateValue(translateValue - 100);
  };

  return (
    <div className="my-5">
      <h6 className="text-white text-2xl">Languages</h6>
      <div className="card-slider">
        <button className="prev-button" onClick={handlePrev}>
          Previous
        </button>
        <div className="card-container">
          <div
            className="cards"
            style={{ transform: `translateX(${translateValue}%)` }}
          >
            {languages.map((language, index) => (
              <div
                key={language.id}
                className={`card ${index === activeIndex ? "active" : ""}`}
              >
                <img
                  src={language.url}
                  className="w-[50px] h-[50px] flex-shrink-0"
                  alt=""
                />
                <p className="text-white flex-shrink-0">{language.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Languages;
