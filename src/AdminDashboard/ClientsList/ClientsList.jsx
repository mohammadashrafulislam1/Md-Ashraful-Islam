import React, { useState, useEffect } from 'react';
import { endPoint } from '../../forAll/forAll';
import Swal from 'sweetalert2';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const clientsLength =clients.length;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${endPoint}/clients`);
        const data = await response.json();
        setClients(data); // Assuming the API returns an array of clients
      } catch (error) {
        console.error('Error fetching client data:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure 
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (clientId) => {
    // Implement your edit functionality here
    console.log(`Editing client with ID: ${clientId}`);
  };

  const handleDelete = async (clientId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${endPoint}/clients/${clientId}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            setClients(clients.filter(client => client._id !== clientId));
            Swal.fire({
              title: "Deleted!",
              text: "Client has been deleted.",
              icon: "success"
            });
          } else {
            throw new Error("Failed to delete client");
          }
        } catch (error) {
          console.error('Error deleting client:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete client.",
            icon: "error"
          });
        }
      }
    });
  };
  
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="text-white text-center m-60 flex justify-center items-center gap-4">
          <span>Loading... </span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div>
          {clients && clients.length > 0 ? (
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
                    <td>{client.clientName}</td>
                    <td>{client.clientEmail}</td>
                    <td><a href={client.clientSocialMedia} target="_blank" rel="noopener noreferrer"><button className="btn btn-primary text-white btn-xs">Visit Social Media</button></a></td>
                    <td>
                      <button  onClick={()=>document.getElementById('my_modal_4').showModal()} className="btn btn-success text-white btn-xs md:mr-1 mb-2">Edit</button>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
                      <button onClick={() => handleDelete(client._id)} className="btn btn-error text-white btn-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-white text-center">No clients found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientsList;
