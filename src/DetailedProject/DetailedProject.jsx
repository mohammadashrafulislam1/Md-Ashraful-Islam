import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { endPoint } from "../forAll/forAll";
import Footer from "../LandingPage/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";
import { motion } from "framer-motion";
import { FaGithub, FaLocationArrow, FaServer } from "react-icons/fa";

const DetailedProject = () => {
  const { id } = useParams();
  const [project, setProperty] = useState();
  const imgRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await fetch(`${endPoint}/projects/${id}`);
      const projectData = await response.json();
      console.log(projectData);
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

  // Define different variants for scroll animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  // Convert to Date object
  const date = new Date(project?.created_at);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <div>
      {/* Header */}
      <Navigation />
      {/* Featured Section and Title */}
      <motion.div
        className="md:flex items-center justify-center relative md:mt-0 mt-6 hero-section pb-20 flex py-14 hero-section px-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <p className="bg-[#ffffff85] text-black w-fit px-2 ml-1 mb-2">
            {formattedDate}
          </p>
          <h2 className="gradient-text !font-[600] !text-5xl poppins">
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
        <div className="container">
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
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DetailedProject;
