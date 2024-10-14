import React, { useState, useEffect } from 'react';
import { endPoint } from "../../forAll/forAll";
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { FaArrowRight } from 'react-icons/fa';
import ScrambleText from '../../forAll/ScrambleText'; // Adjust the path as needed
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS

const ProjectSection = () => {
  const [projects, setProjects] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await fetch(`${endPoint}/projects`);
        const data = await projectsResponse.json();
        const sortedProperties = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setProjects(sortedProperties);
        setFilteredProjects(sortedProperties);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
    AOS.init({ duration: 1000 }); // Initialize AOS with desired duration
  }, []);

  const texts = [
    'projects that i built_',
    'cool stuff I created_',
    'my awesome work_'
  ];

  return (
    <Box id="projects" data-aos="fade-up">
      <h1 className="mb-5 section-title">
        <ScrambleText texts={texts} />
      </h1>
      <div className='Project-sec'>
        <Grid container spacing={4}>
          {filteredProjects && filteredProjects.slice(0, 8).map((project, index) => (
            <Grid item xs={12} sm={12} md={6} key={index} className="flipping" data-aos="fade-right" data-aos-delay={index * 100}>
              <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
                <div>
                  <Typography variant="h2" className="gradient-text !font-[600] font-poppins !text-[30px]" sx={{ mb: 2 }}>
                    {project.title.split('<br>').map((line, index) => (
                      <React.Fragment key={index}>{line}<br /></React.Fragment>
                    ))}
                  </Typography>
                </div>
                <Box className="flip-container">
                  <img
                    className="flip-image"
                    alt={project.title + "Md Ashraful Islam - PortFolio - Best Web Developer - MERN Stack - Full stack web Developer"}
                    src={project.projectImage}
                    style={{ color: 'transparent', objectFit: 'cover', objectPosition: 'top',}}
                  />
                  <Link to={`project/${project?.title.replace(/\s+/g, '_')}`}><FaArrowRight className="arrow-icon" /></Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4 }} className="flex justify-center" data-aos="fade-up">
          <Link to="/projects">
            <Button variant="contained" color="primary">
              All projects
            </Button>
          </Link>
        </Box>
      </div>
    </Box>
  );
};

export default ProjectSection;
