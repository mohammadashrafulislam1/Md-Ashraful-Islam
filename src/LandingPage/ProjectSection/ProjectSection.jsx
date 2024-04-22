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
        setFilteredProjects(projectsData)
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, []);

  const hanleCategory = (category) =>{
    console.log(category)
   if(category === "All"){
    setFilteredProjects(projects)
   }
   else{
    const filterProject = projects.filter(project => project.projectCategory === category)
    setFilteredProjects(filterProject)
   }
  }
  
  return (
    <div className="my-16 project-section text-white">
      <h6 className="text-white text-2xl mb-12">Projects --</h6>
      <div>
        {/* Categories */}
        <div className="flex gap-2 justify-center mb-10">
          <p className="tag-area" onClick={()=>hanleCategory("All")}>All</p>
          <p className="tag-area" onClick={()=>hanleCategory("Full Stack Web Development")}>Full Stack Web Development</p>
          <p className="tag-area" onClick={()=>hanleCategory("CMS")}>CMS</p>
          <p className="tag-area" onClick={()=>hanleCategory("Search Engine Optimization")}>SEO</p>
          <p className="tag-area" onClick={()=>hanleCategory("Web Design")}>Web Design</p>
          <p className="tag-area" onClick={()=>hanleCategory("Video Editing")}>Video Editing</p>
        </div>
        
        {/* Projects */}
      <div>
      {filteredProjects?.map((project, index) => (
          <div className="relative" key={index}>
            <div className="flex gap-3 mb-5 align-middle items-center justify-center">
              <div>
                <figure>
                  <img className="w-[400px] h-[400px] rounded-[10px]" src={project.projectImage} alt={project.title} />
                </figure>
              </div>
              <div className="body-area flex flex-col justify-between">
                <div>
                  <h1 className="text-2xl uppercase font-medium">{project.title}</h1>
                  <div className="font-[300]" dangerouslySetInnerHTML={{ __html: truncateDescription(project.description, 30) }} />
                  <p className="font-[600] text-blue-400">Project Category: <span className="font-[300]">{project.projectCategory}</span></p>
                  <div className="flex gap-4 mt-2">
                  <a href={project.githubUrl} target="_blank"><p className="tag-area">GitHub</p></a>
                  <a href={project.projectUrl} target="_blank">
                  <p className="tag-area">Live Website</p></a>
                  </div>
                  <div>
                    <p className="mt-2">Project Duration: {project.duration} days</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link><button className="button-rounded"><p>View</p></button></Link>
                </div>
              </div>
            </div>
            <div className="flex gap-5 absolute bottom-12 right-28 font-[100]">
              {JSON.parse(project?.technologies)?.slice(0, 6).map((technology, index) => (
                <div key={index} className="tag-area"><p className="font-light">{technology}</p></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ProjectSection;
