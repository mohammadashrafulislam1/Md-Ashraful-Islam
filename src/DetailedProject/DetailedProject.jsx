import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../forAll/forAll";
import Footer from "../LandingPage/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";
import { motion } from "framer-motion";
import { FaGithub, FaLocationArrow, FaServer } from "react-icons/fa";
import ScrambleText from "../forAll/ScrambleText";

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

const DetailedProject = () => {
  const { id } = useParams();
  const [project, setProperty] = useState();
  const imgRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await fetch(`${endPoint}/projects/${id}`);
      const projectData = await response.json();
      setProperty(projectData);
    };
    fetchProperty();
  }, [id]);

  // Handle image load to set scroll amount dynamically
  useEffect(() => {
    const handleImageLoad = () => {
      if (imgRef.current) {
        const imgHeight = imgRef.current.offsetHeight;
        const screenHeight = imgRef.current.parentElement.offsetHeight;
        setScrollAmount(screenHeight - imgHeight);
      }
    };

    const img = imgRef.current;
    img.addEventListener("load", handleImageLoad);

    return () => {
      if (img) {
        img.removeEventListener("load", handleImageLoad);
      }
    };
  }, [project]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 }, // Fade in with upward scroll effect
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const date = new Date(project?.created_at);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  const DesTexts = ["description_", "what we have done?_", "how we completed?_"];

  return (
    <div>
      <Navigation />

      <motion.div
        className="flex mx-auto flex-col lg:flex-row items-center justify-center relative md:mt-0 hero-section pb-20 py-14 px-5 md:px-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:w-1/2 w-full md:text-left project-des">
          <p className="bg-[#ffffff85] text-black w-fit px-2 ml-1 mb-2">
            {formattedDate}
          </p>
          <h2 className="gradient-text lg:!font-[600] lg:!text-5xl poppins">
            {project?.title}
          </h2>
          <p className="text-[#ffffff85] ml-1 mb-3">
            {project?.projectCategory}
          </p>
          <div className="flex gap-2 mt-5">
            {project?.projectUrl && (
              <a href={project.projectUrl} target="_blank" rel="noreferrer">
                <button className="bookmarkBtn button">
                  <span className="IconContainer">
                    <FaLocationArrow className="icon" />
                  </span>
                  View
                </button>
              </a>
            )}
            {project?.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <button className="bookmarkBtn button">
                  <span className="IconContainer">
                    <FaGithub className="icon" />
                  </span>
                  GitHub
                </button>
              </a>
            )}
            {project?.githubServerUrl && (
              <a
                href={project.githubServerUrl}
                target="_blank"
                rel="noreferrer"
              >
                <button className="bookmarkBtn button">
                  <span className="IconContainer">
                    <FaServer className="icon" />
                  </span>
                  GitHub Server
                </button>
              </a>
            )}
          </div>
        </div>

        <div className="container w-full lg:w-1/2">
          <div className="content">
            <div className="screen">
              <img
                ref={imgRef}
                src={project?.projectImage}
                alt={project?.title}
                style={{
                  position: "absolute",
                  top: 0,
                  width: "100%",
                  height: "auto",
                  zIndex: 0,
                  transition: "top 11s",
                }}
                onMouseEnter={() => (imgRef.current.style.top = `${scrollAmount}px`)}
                onMouseLeave={() => (imgRef.current.style.top = "0px")}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <div className="my-10 md:w-1/2 w-full mx-auto md:p-0 p-5">
        <ScrambleText texts={DesTexts}></ScrambleText>
        <p
          className="text-[16px] md:text-[18px] text-black font-normal text-white font-[300]"
          dangerouslySetInnerHTML={{ __html: project?.description }}
        />
      </div>

      {/* Gallery Images with Swiper on Mobile/Tablet */}
      <div className="gallery my-10 w-full mx-auto px-5 md:w-3/4">
        {/* Swiper for Mobile and Tablet */}
        <div className="block md:hidden">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {project?.galleryImages?.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Gallery Image ${index}`}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid Layout for Desktop */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {project?.galleryImages?.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt="Gallery Image"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              variants={imageVariants}
            />
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailedProject;
