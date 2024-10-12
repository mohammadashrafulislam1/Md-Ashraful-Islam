import { useEffect, useState } from "react";
import { endPoint } from "../forAll/forAll";
import ProjectCard from "../forAll/ProjectCard";

const Loader = () => (
    <div className="flex justify-center items-center h-screen w-screen bg-black">
        <div className="loader">
            {/* CSS Spinner or any custom loading animation */}
            <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-white"></div>
        </div>
    </div>
);

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${endPoint}/projects`);
                const data = await response.json();
                const sortedProperties = data
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                setProjects(sortedProperties);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching projects:", error);
                setLoading(false); // Stop loading even if there is an error
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return <Loader />; // Display loader while fetching data
    }

    return (
        <div className="text-white mx-auto">
            <h1 className="text-center my-10">All Projects</h1>
            <div className="flex flex-col gap-5">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard key={project?.id} project={project} />
                    ))
                ) : (
                    <p>No projects found</p>
                )}
            </div>
        </div>
    );
};

export default AllProjects;
