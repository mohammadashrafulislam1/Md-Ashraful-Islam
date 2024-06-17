import { useState, useEffect } from "react";
import { endPoint } from "../../forAll/forAll";
import { Link } from "react-router-dom";

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
      const filterProject = projects.filter(project => project.projectCategory === category);
      setFilteredProjects(filterProject);
    }
  };

  return (
    <div className="mt-16 project-section text-white overflow-hidden">
      <h6 className="text-white text-2xl mb-5 md:mb-12 pt-10 md:pt-0">Projects --</h6>
      <div className="categories-container">
        <div className="md:flex flex gap-2 justify-center mb-10">
          <p className="tag-area" onClick={() => handleCategory("All")}>All</p>
          <p className="tag-area" onClick={() => handleCategory("Full Stack Web Development")}>Full Stack Web Development</p>
          <p className="tag-area" onClick={() => handleCategory("CMS")}>CMS</p>
          <p className="tag-area" onClick={() => handleCategory("Search Engine Optimization")}>SEO</p>
          <p className="tag-area" onClick={() => handleCategory("Web Design")}>Web Design</p>
          <p className="tag-area" onClick={() => handleCategory("Video Editing")}>Video Editing</p>
        </div>
      </div>
      <div className="md:pb-10 pb-20">
        {filteredProjects?.map((project, index) => (
          <div key={index} className="project-container mb-8 p-4 rounded-lg shadow-lg bg-gray-800 flex justify-center">
            <div className="">
                <img className="rounded-md w-[500px] h-[500px]" src={project.projectImage} alt={`Project Image ${project.title}`} />
            </div>
            {/* body */}
            <div>
            <div className="body-area flex flex-col justify-between">
              <div>
                <h1 className="text-2xl uppercase font-medium">{project.title}</h1>
                <div className="font-[300]" dangerouslySetInnerHTML={{ __html: truncateDescription(project.description, 30) }} />
                <p className="font-[600] text-blue-400">Project Category: <span className="font-[300]">{project.projectCategory}</span></p>
                <div className="flex gap-4 mt-2">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <p className="tag-area md:text-[14px] text-[12px]">GitHub</p>
                  </a>
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    <p className="tag-area md:text-[14px] text-[12px]">Live Website</p>
                  </a>
                </div>
                <div>
                  <p className="mt-2">Project Duration: {project.duration} days</p>
                </div>
              </div>
              <div className="flex md:justify-end justify-center lg:mt-2 mb-[-6px]">
                <Link to={`/projects/${project.id}`}>
                  <button className="button-rounded mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <p>View</p>
                  </button>
                </Link>
              </div>
            </div>
            <div className="categories-container">
              <div className="md:flex flex flex-nowrap gap-1 md:gap-2 lg:gap-5 lg:bottom-12 lg:right-28 font-[100] text-[12px] md:text-[14px] lg:text-[16px] bottom-[1] ml-4 md:right-0 md:bottom-8">
                {project.technologies && JSON.parse(project.technologies).slice(0, 5).map((technology, index) => (
                  <div key={index} className="tag-area">
                    <p className="font-light">{technology}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
