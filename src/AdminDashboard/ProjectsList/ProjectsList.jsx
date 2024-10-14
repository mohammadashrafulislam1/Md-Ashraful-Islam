import { useState, useEffect } from "react";
import { endPoint } from "../../forAll/forAll";
import Swal from "sweetalert2";
import EditProject from "../../Model/EditProject";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [clientDataMap, setClientDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${endPoint}/projects`);
        const data = await response.json();
        setProjects(data);
        // Fetch client data for each project concurrently
        const clientIds = data.map((project) => project?.clientInfo);
        const clientDataPromises = clientIds.map((clientId) =>
          fetch(`${endPoint}/clients/${clientId}`).then((response) =>
            response.json()
          )
        );
        const clientDataArray = await Promise.all(clientDataPromises);
        const clientDataMap = clientIds.reduce((acc, clientId, index) => {
          acc[clientId] = clientDataArray[index];
          return acc;
        }, {});
        setClientDataMap(clientDataMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  const handleDeleteProject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${endPoint}/projects/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            // Update projects state by removing the deleted project
            setProjects(projects.filter((project) => project._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } else {
            throw new Error("Failed to delete project");
          }
        } catch (error) {
          console.error("Error deleting project:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete project.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleUpdateProject = (titl) => {
    setProjectId(title); // Set the project ID to be edited
    setIsModalOpen(true); // Show the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setProjectId(null); // Reset the project ID if necessary
  };
  const parseTechnologies = (technologies) => {
    try {
      return JSON.parse(technologies);
    } catch (error) {
      console.error("Error parsing technologies JSON:", error);
      return [];
    }
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
          {projects && projects.length > 0 ? ( // Check if projects array is not empty
            <table className="table text-white">
              <thead className="text-white">
                <tr>
                  <th className="pr-0 w-[2%] text-center">No</th>
                  <th className="w-[65%] text-center">Projects</th>
                  <th className="w-[15%] text-center ">Clients</th>
                  <th className="w-[18%] text-center">Controller</th>
                </tr>
              </thead>
              {projects.map((project, index) => (
                <tbody key={index}>
                  <tr className="text-white">
                    <td className="pr-0 w-[2%] font-bold text-center">
                      {index + 1}
                    </td>
                    <td className="w-[65%]">
                      <div className="flex items-center gap-3">
                        <div className="avatar mx-0">
                          <div className="w-20 h-12 md:w-32 md:h-20">
                            <img
                              src={project?.projectImage}
                              alt="Project"
                              className="w-full rounded"
                              style={{
                                color: "transparent",
                                objectFit: "cover",
                                objectPosition: "top",
                              }}
                            />
                          </div>
                        </div>
                        <div className="ml-10 flex flex-col justify-start">
                          <div className="font-bold mx-2 text-start">
                            {project?.title}
                          </div>
                          <div className="flex gap-[2px] flex-wrap">
                            {parseTechnologies(project?.technologies).map(
                              (technology, index) => (
                                <span
                                  className="w-fit bg-[#e7e7e7]  mx-1 text-black rounded-2xl py-0 px-2 text-[13px] font-normal"
                                  key={index}
                                >
                                  {technology}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="w-[15%] text-center">
                      {clientDataMap[project?.clientInfo]?.clientName}
                      <br />
                      <div className="text-sm opacity-50 mb-1">
                        {clientDataMap[project.clientInfo]?.clientEmail}
                      </div>
                      <a
                        href={`${
                          clientDataMap[project?.clientInfo]?.clientSocialMedia
                        }`}
                        target="_blank"
                      >
                        <button className="btn-primary btn btn-xs">
                          Social
                        </button>
                      </a>
                    </td>
                    <td className="w-[18%]">
                      <button
                        className="btn btn-success text-white btn-xs md:mr-1 mb-2"
                        onClick={() => handleUpdateProject(project?.title)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-error text-white btn-xs"
                        onClick={() => handleDeleteProject(project?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
              {isModalOpen && (
                <EditProject title={projectId} onClose={handleCloseModal} />
              )}
            </table>
          ) : (
            <div className="text-white text-center">No projects found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
