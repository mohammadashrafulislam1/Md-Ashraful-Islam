import React, { useState, useEffect } from 'react';
import { endPoint } from '../../forAll/forAll';
import Root from '../AdminDashboard/Root/Root';
import ProjectsList from '../AdminDashboard/ProjectsList/ProjectsList';
import ClientsList from '../AdminDashboard/ClientsList/ClientsList';

const ParentComponent = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await fetch(`${endPoint}/projects`);
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
  
        const clientsResponse = await fetch(`${endPoint}/clients`);
        const clientsData = await clientsResponse.json();
        setClients(clientsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Root projectsLength={projects.length} clientsLength={clients.length}/>
      <ProjectsList projects={projects} loading={loading}/>
      <ClientsList clients={clients} loading={loading}/>
    </div>
  );
};

export default ParentComponent;
