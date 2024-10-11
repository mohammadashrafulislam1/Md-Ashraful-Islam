import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../forAll/forAll";
import Footer from "../LandingPage/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";
import { motion } from "framer-motion";
import { FaGithub, FaLocationArrow, FaRegStar, FaServer, FaStar } from "react-icons/fa";
import ScrambleText from "../forAll/ScrambleText";
import { MdContacts } from "react-icons/md";
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import Rating from "react-rating";
import { Typography } from "@mui/material";
import { FaQuoteLeft } from "react-icons/fa";


const DetailedProject = () => {
  const { id } = useParams();
  const [project, setProperty] = useState();
  const [client, setClient] = useState();
  const [testimonial, setTestimonial] = useState();
  const imgRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);
  console.log(project)
  useEffect(() => {
    const fetchProperty = async () => {
      const response = await fetch(`${endPoint}/projects/${id}`);
      const projectData = await response.json();
      setProperty(projectData);
  
      // Assuming projectData.testimonialId contains the single testimonial ID
      const testimonialId = projectData.testimonial; // or projectData.testimonial if that's how it's structured
  
      // Fetch testimonials
      const fetchTestimonials = async () => {
        const response = await fetch(`${endPoint}/testimonial`);
        const testimonialData = await response.json();
  
        // Filter the testimonial data based on the single testimonial ID
        const filteredTestimonial = testimonialData.find(testimonial => 
          testimonial._id === testimonialId
        );
  
        console.log(filteredTestimonial);
        // Set the filtered testimonial to state if needed
        setTestimonial(filteredTestimonial);
      };
  
      fetchTestimonials();
    };
  
    fetchProperty();
    const fetchClient = async () => {
      const response = await fetch(`${endPoint}/clients/${project?.clientInfo}`);
      const clientData = await response.json();
      setClient(clientData);
    };
    fetchClient();
    
  }, [id, project]);

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
  const ChallangesTexts = ["challanges_", "trouble that i faced_", "what obstacles faced?_"];
  const ClientTexts = ["client data_", "for whom this project was created_", "about client_"];
  const parseTechnologies = (technologies) => {
    try {
      return JSON.parse(technologies);
    } catch (error) {
      console.error("Error parsing technologies JSON:", error);
      return [];
    }
  };
  // Define the animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
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
      <div className="my-10 md:w-[70%] lg:w-1/2 w-full mx-auto md:p-0 p-5">
        <ScrambleText texts={DesTexts}></ScrambleText>
        <p
          className="text-[16px] md:text-[18px] text-black font-normal text-white font-[300]"
          dangerouslySetInnerHTML={{ __html: project?.description }}
        />
      </div>

      {/* Gallery Images with Swiper on Mobile/Tablet */}
      <div className="gallery my-10 w-full mx-auto px-5 md:w-3/4 relative">
  {/* Background blur shadow */}
 
        {/* Swiper for Mobile and Tablet */}
        <div className="block md:hidden relative z-10">
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
                  className="w-full h-auto object-cover rounded-2xl shadow-lg"
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
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {project?.galleryImages?.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt="Gallery Image"
              className="w-full h-auto object-cover rounded-2xl shadow-lg galleryImages"
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
              className=""
              style={{
                background: "rgba( 255, 255, 255, 0.01 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 6px )",
                borderRadius: "10px",
                WebkitBackdropFilter: "blur( 6px )",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="p-4 text-center">
                <span className="text-white md:font-medium font-normal lg:text-[17px] md:text-[15px] text-[13px]">{tech}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details about author */}
      <motion.div
      className="my-10 w-full md:w-[90%] mx-auto md:p-5 p-2 bg-gradient-to-r from-[#1e1e2e] to-[#2e2e42] rounded-lg shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <ScrambleText texts={DetailTexts}></ScrambleText>

      <div className="mt-5 space-y-4">
        {/* User Name */}
        <motion.div
          className="md:flex items-center text-white font-semibold md:text-lg text-[12px]"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[#00BFFF] md:mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-3-3.87M9 20a4 4 0 0 0-3-3.87v-2A4 4 0 0 1 13 5a4 4 0 0 1 7 4v2a4 4 0 0 0 1 7.87V21" />
            </svg>
          </span>
          <span className="text-[#ffffff85] mr-2">Name: </span>
          {project?.userName}
        </motion.div>

        {/* User Email */}
        <motion.div
          className="md:flex items-center text-white font-semibold  md:text-lg text-[12px]"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[#00BFFF] md:mr-3">
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
          className="md:flex items-center text-white font-semibold  md:text-lg text-[12px]"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[#00BFFF] md:mr-3">
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
    <p className="md:w-[70%] lg:w-1/2 w-full text-white font-normal mx-auto md:p-0 p-3">{project?.challenges}</p>
    </div>


    {/* Tablet Image */}
    {project?.tabletImage && project.tabletImage.trim() == '' && (
        <div className="device-display tablet flex justify-center my-8">
          <div className="w-96 h-[550px] border-8 border-gray-800 rounded-lg p-4 bg-gray-200">
            <img 
              src={project.tabletImage} 
              alt={`${project.title} Tablet View`} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      )}

      {/* Mobile Image */}
      {project?.mobileImage && project.tabletImage.trim() == '' && (
        <div className="device-display mobile flex justify-center my-8">
          <div className="w-56 h-[500px] border-8 border-gray-800 rounded-2xl p-4 bg-gray-200">
            <img 
              src={project.mobileImage} 
              alt={`${project.title} Mobile View`} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      )}
    {/* client info */}
     <div>
    <ScrambleText texts={ChallangesTexts}></ScrambleText>
    <motion.div
      className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.3 }} // Adjust duration for speed of animation
    >
      <img
        src={client?.clientPhoto}
        alt={client?.clientName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{client?.clientName}</h2>
        <p className="text-gray-600">{client?.clientEmail}</p>
        <p className="text-gray-600">
          <a
            href={`http://${client?.clientSocialMedia}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {client?.clientSocialMedia}
          </a>
        </p>
        <p className="text-gray-500 text-sm">
          Joined on {new Date(client?.created_at).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
     </div>

{/* Testimonial Section */}
{ testimonial && (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="mt-10 testimonial relative md:p-8 p-4 lg:max-w-[80%] max-w-[90%] mx-auto bg-gradient-to-r from-blue-500 to-blue-800 rounded-lg shadow-2xl overflow-hidden"
  >
    
    <div className="relative mb-6 hidden  md:block">
      <div className=" clip object-cover absolute right-0 top-0 w-24 h-24 border-4 border-gray-800 rounded-full bg-white transform rotate-12"></div>
      <img src={testimonial.image} alt={testimonial.name} className="object-cover absolute right-0 top-0 w-24 h-24 border-4 border-white rounded-full shadow-lg transform rotate-[-5deg] transition-transform duration-300 hover:scale-105"/>
    </div>
    
    <p className="lg:text-lg md:text-[16px] text-[15px] italic text-gray-300 mb-4 md:mr-28 flex gap-1"><FaQuoteLeft  className="lg:!text-[50px] hidden md:block !text-[80px] mr-5 mt-0"/>{testimonial.testimonial}</p>
    
    <div className="source flex md:justify-end justify-center items-center gap-3">
    <div className=" md:hidden block w-[70px] h-[70px]">
      <img src={testimonial.image} alt={testimonial.name} className="object-cover w-[70px] h-[70px] border-2 border-white rounded-full shadow-lg transform rotate-[-5deg] transition-transform duration-300 hover:scale-105"/>
    </div>
      <div className="flex flex-col text-end">
      <span className="font-bold md:text-xl text-[18px] text-gray-200">{testimonial.name}</span>
      <span className="text-sm text-gray-300">{testimonial.des}</span>
      <p className="text-sm">
        <a
          href={`http://${client?.clientSocialMedia}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:underline"
        >
          {client?.clientSocialMedia}
        </a>
      </p></div>
    </div>

    <div className="md:mt-4 mt-0">
      <Typography component="legend" className="text-sm font-semibold text-gray-700">Ratings</Typography>
      <Rating
        initialRating={testimonial.rating}
        emptySymbol={<FaRegStar className="text-gray-400" />}
        fullSymbol={<FaStar className="text-yellow-500" />}
        readonly
        className="text-xl"
      />
    </div>
  </motion.div>
)}




      
    <div  className="mt-24">
      <Footer/></div>
    </div>
  );
};

export default DetailedProject;
