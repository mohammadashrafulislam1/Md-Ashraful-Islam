import { FaAngleRight } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
    console.log(project);
    
    // Extract and format the date from created_at
    const date = new Date(project?.created_at);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options); // Adjust locale as needed

    return (
        <div className="project-card w-[95%] justify-center lg:w-[90%] lg:px-0 px-3 md:px-8 mx-auto md:flex items-center rounded-lg shadow-lg mb-3">
            <div className="relative"> {/* Added relative position for the parent div */}
                <div className="lg:w-[500px] w-[350px] h-[250px] lg:h-[400px] rounded-2xl overflow-hidden">
                    <img
                        src={project?.projectImage}
                        alt={project?.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: '10px',
                            objectFit: 'cover',
                            objectPosition: 'top'
                        }}
                    />
                    {/* Overlay for date */}
                    <div className="absolute top-0 left-0 bg-black bg-opacity-70 text-white text-sm p-2 rounded-br-lg">
                        {formattedDate} {/* Display the formatted date */}
                    </div>
                </div>
            </div>
            <div className="md:ml-[-80px] md:mt-0 mt-[-20px] md:w-full md:h-full w-[350px] p-5" style={{
                background: "rgba( 255, 255, 255, 0.01 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 16px )",
                borderRadius: "10px",
                WebkitBackdropFilter: "blur( 6px )",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
            }}>
                <h2 className="lg:text-xl text-[18px] font-bold">{project?.title}</h2>
                <p
                    className="md:text-[16px] text-[13px] lg:text-[18px] text-black font-normal text-white font-[300] line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: project?.description }}
                />
                <Link to={`/project/${project._id}`}>
                    <button className="flex gap-2 !justify-end items-center px-6 py-2 !mt-3 rounded-lg group !mr-0 text-white font-semibold">
                        View <FaAngleRight />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
