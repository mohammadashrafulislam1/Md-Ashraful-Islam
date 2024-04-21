
import { useState, useEffect } from "react";
import { endPoint } from "../../forAll/forAll";

const ProjectSection = () => {
  const [projects, setProjects] = useState(null)
  useEffect(()=>{
    const fetchData = async()=>{
     const projectsResponse = await fetch(`${endPoint}/projects`);
     const projectsData = await projectsResponse.json();
     setProjects(projectsData)
    }
    fetchData()
  },[])
    return (
        <div className="my-16">
      <h6 className="text-white text-2xl mb-5">Projects --</h6>
  {
    projects?.map((project, index) => <div className="card w-96 glass" key={index}>
  <figure><img className="" src={project.projectImage} alt="car!"/></figure>

</div>)
  }
            
        </div>
    );
};

export default ProjectSection;