import React, { useState, useEffect } from 'react';
import { endPoint } from '../../forAll/forAll';
import Root from '../AdminDashboard/Root/Root';
import ClientsList from '../AdminDashboard/ClientsList/ClientsList';

const ParentComponent = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  console.log(projects)
  return (
    <div>
      <ClientsList allClients={clients} loading={loading}/>
    </div>
  );
};

export default ParentComponent;
