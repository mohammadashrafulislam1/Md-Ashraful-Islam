import React, { useState, useEffect } from 'react';
import { endPoint } from '../../forAll/forAll';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [clientDataMap, setClientDataMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${endPoint}/projects`);
        const data = await response.json();
        setProjects(data);
        // Fetch client data for each project concurrently
        const clientIds = data.map(project => project.clientInfo);
        const clientDataPromises = clientIds.map(clientId =>
          fetch(`${endPoint}/clients/${clientId}`).then(response => response.json())
        );
        const clientDataArray = await Promise.all(clientDataPromises);
        const clientDataMap = clientIds.reduce((acc, clientId, index) => {
          acc[clientId] = clientDataArray[index];
          return acc;
        }, {});
        setClientDataMap(clientDataMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
       <table className="table text-white">
          <thead className='text-white'>
            <tr>
              <th className='pr-0 w-[2%] text-center'>No</th>
              <th className='w-[65%] text-center'>Projects</th>
              <th className='w-[15%] text-center '>Clients</th>
              <th className='w-[18%] text-center'>Controller</th>
            </tr>
          </thead>
      {projects.map((project, index) => (
          <tbody  key={index}>
            <tr className='text-white'>
              <td className='pr-0 w-[2%] font-bold text-center'>{index + 1}</td>
              <td className='w-[65%]'>
                <div className="flex items-center gap-3">
                  <div className="avatar mx-0">
                    <div className="w-20 h-12 md:w-32 md:h-20">
                      <img src={project.projectImage} alt="Md Ashraful Islam Portfolio Showcase" className="w-full rounded" />
                    </div>
                  </div>
                  <div className='ml-10'>
                    <div className="font-bold mx-2">{project.title}</div>
                    {JSON.parse(project.technologies)?.map((technology, index) =>
                      <span className="badge badge-ghost badge-sm mx-1" key={index}>{technology}</span>
                    )}
                  </div>
                </div>
              </td>
              <td className='w-[15%] text-center'>
                {clientDataMap[project.clientInfo]?.clientName}
                <br />
                <div className="text-sm opacity-50 mb-1">{clientDataMap[project.clientInfo]?.clientEmail}</div>
                <a href={`${clientDataMap[project.clientInfo]?.clientSocialMedia}`} target='_blank'><button className='btn-primary btn btn-xs'>Social</button></a>
              </td>
              <td className='w-[18%]'>
                <button className="btn btn-success text-white btn-xs md:mr-1 mb-2">Update</button>
                <button className="btn btn-error text-white btn-xs">Delete</button>
              </td>
            </tr>
          </tbody>
        
      ))}
      </table>
    </div>
  );
};

export default ProjectsList;
