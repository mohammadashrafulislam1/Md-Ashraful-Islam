import React, { useState, useEffect } from 'react';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [clientData, setClientData] = useState([]);
  const clientId = projects?.map(project => project.clientInfo);
      const fetchClientInfo = async (clientId) => {
      try {
        const response = await fetch(`http://localhost:5000/clients/${clientId}`);
        const data = await response.json();
        setClientData(data);
      } catch (error) {
        console.error('Error fetching client data:', error);
        return null;
      }
    };
    fetchClientInfo(clientId)
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/projects');
        const data = await response.json();
        setProjects(data); // Assuming the API returns an array of projects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="overflow-x-auto">
    {projects?.map((project, index) =>(<table className="table text-white" key={index}>
      {/* head */}
      <thead className='text-white'>
        <tr>
          <th className='pr-0 w-[2%] text-center'>No</th>
          <th className='w-[65%] text-center'>Projects</th>
          <th className='w-[15%] text-center '>Clients</th>
          <th className='w-[18%] text-center'>Controller</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <tr className='text-white'>
          <td className='pr-0 w-[2%] font-bold text-center'>{index+1}</td>
          <td className='w-[65%]'>
            <div className="flex items-center gap-3">
              <div className="avatar mx-0">
                <div className="w-20 h-12 md:w-32 md:h-20">
                  <img src={project.projectImage} alt="Md Ashraful Islam Portfolio Showcase" className="w-full rounded" />
                </div>
              </div>
              <div>
                <div className="font-bold">{project.title}</div>
            {project.technologies?.map((technology, index) =>(
                <span className="badge badge-ghost badge-sm mx-1" key={index}>{technology}</span>
            ))}               
              </div>
            </div>
          </td>
          <td className='w-[15%] text-center'>
           {clientData?.userName}
            <br/>
            <div className="text-sm opacity-50 mb-1">{clientData?.userEmail}</div>
            <a href={`${clientData?.userSocialMedia}`}><button className='btn-primary btn btn-xs'>Social</button></a>
          </td>
          <td className='w-[18%]'>
            <button className="btn btn-success text-white btn-xs md:mr-1 mb-2">Update</button>
            <button className="btn btn-error text-white btn-xs">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>))}
  </div>
  );
};

export default ProjectsList;
