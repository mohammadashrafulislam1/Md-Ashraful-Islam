import React, { useState, useEffect } from 'react';

const ClientsList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:5000/clients');
        const data = await response.json();
        setClients(data); // Assuming the API returns an array of clients
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (clientId) => {
    // Implement your edit functionality here
    console.log(`Editing client with ID: ${clientId}`);
  };

  const handleDelete = (clientId) => {
    // Implement your delete functionality here
    console.log(`Deleting client with ID: ${clientId}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table text-white">
        <thead>
          <tr className="text-white">
            <th>User Name</th>
            <th>Email</th>
            <th>Social</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.userName}</td>
              <td>{client.userEmail}</td>
              <td><a href={client.userSocialMedia} target="_blank" rel="noopener noreferrer"><button className="btn btn-primary text-white btn-xs">Visit Social Media</button></a></td>
              <td>
                <button onClick={() => handleEdit(client._id)} className="btn btn-success text-white btn-xs md:mr-1 mb-2">Edit</button>
                <button onClick={() => handleDelete(client._id)} className="btn btn-error text-white btn-xs">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;
