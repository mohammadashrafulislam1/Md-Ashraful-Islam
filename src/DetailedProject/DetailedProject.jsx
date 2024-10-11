import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../forAll/forAll";
import Footer from "../LandingPage/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";
import { motion } from "framer-motion";
import { FaGithub, FaLocationArrow, FaServer } from "react-icons/fa";
import ScrambleText from "../forAll/ScrambleText";
import { MdContacts } from "react-icons/md";
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
  console.log(project)
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
  const TechTexts = ["technologies_", "what technologies i used?_", "tools_"];
  const DetailTexts = ["details_", "about the author_", "who developed the website?_"];
  const ChallangesTexts = ["challanges", "trouble that i faced_", "what obstacles faced?_"];
  const parseTechnologies = (technologies) => {
    try {
      return JSON.parse(technologies);
    } catch (error) {
      console.error("Error parsing technologies JSON:", error);
      return [];
    }
  };

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

      {/* Technologies */}
      <div className="my-10 w-full md:w-[90%] mx-auto">
        <ScrambleText texts={TechTexts}></ScrambleText>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-5">
          {parseTechnologies(project?.technologies)?.map((tech, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-4 text-center">
                <span className="text-white font-medium text-[17px]">{tech}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details about author */}
      <motion.div
      className="my-10 w-full md:w-[90%] mx-auto p-5 bg-gradient-to-r from-[#1e1e2e] to-[#2e2e42] rounded-lg shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <ScrambleText texts={DetailTexts}></ScrambleText>

      <div className="mt-5 space-y-4">
        {/* User Name */}
        <motion.div
          className="flex items-center text-white font-semibold text-lg"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[#00BFFF] mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-3-3.87M9 20a4 4 0 0 0-3-3.87v-2A4 4 0 0 1 13 5a4 4 0 0 1 7 4v2a4 4 0 0 0 1 7.87V21" />
            </svg>
          </span>
          <span className="text-[#ffffff85] mr-2">Name: </span>
          {project?.userName}
        </motion.div>

        {/* User Email */}
        <motion.div
          className="flex items-center text-white font-semibold text-lg"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[#00BFFF] mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
              <polyline points="22 6 12 13 2 6" />
            </svg>
          </span>
          <span className="text-[#ffffff85] mr-2">Email: </span>
          {project?.userEmail}
        </motion.div>

        {/* Project Duration */}
        <motion.div
          className="flex items-center text-white font-semibold text-lg"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[#00BFFF] mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          <span className="text-[#ffffff85] mr-2">Project Duration: </span>
          {project?.duration} hours
        </motion.div>

        {/* Action Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="flex gap-2 justify-center items-center px-6 py-2 rounded-lg group text-white font-semibold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          ><MdContacts/>
            Want My Service?
          </motion.button>
        </motion.div>
      </div>
    </motion.div>

    {/* challanges */}
    <div>
    <ScrambleText texts={ChallangesTexts}></ScrambleText>
    </div>


      <Footer />
    </div>
  );
};

export default DetailedProject;
