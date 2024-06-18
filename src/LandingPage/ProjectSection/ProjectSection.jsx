import React, { useState, useEffect } from 'react';
import { endPoint } from "../../forAll/forAll";
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { FaArrowRight } from 'react-icons/fa';

const truncateDescription = (description, limit) => {
  const words = description.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  } else {
    return description;
  }
};

const ProjectSection = () => {
  const [projects, setProjects] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(null);
  console.log(projects);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await fetch(`${endPoint}/projects`);
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
        setFilteredProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategory = (category) => {
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      const filterProject = projects.filter(project => project.category === category);
      setFilteredProjects(filterProject);
    }
  };

  return (
    <Box id="projects" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ mb: 4 }}>
          projects that i built_
        </Typography>
        <Grid container spacing={4}>
          {filteredProjects && filteredProjects.map((project, index) => (
            <Grid item xs={12} sm={12} md={6} key={index} className="flipping">
              <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
                <Typography variant="h2" className="gradient-text" sx={{ mb: 2 }}>
                  {project.title.split('<br>').map((line, index) => (
                    <React.Fragment key={index}>{line}<br /></React.Fragment>
                  ))}
                </Typography>
                <Box className="flip-container">
                  <img
                    className="flip-image"
                    alt={project.title}
                    src={project.projectImage}
                    width="238"
                    height="139"
                    style={{ color: 'transparent', objectFit: 'cover', height: '140px' }}
                  />
                  <FaArrowRight className="arrow-icon" />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Link to="/home/project">
            <Button variant="contained" color="primary">
              All projects
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectSection;
