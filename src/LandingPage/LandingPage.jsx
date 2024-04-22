import ProjectSubmissionForm from "../AdminDashboard/ProjectSubmissionForm/ProjectSubmissionForm ";
import Contact from "./Contact/Contact";
import LandingHero from "./LandingHero/LandingHero";
import Languages from "./Languages/Languages";
import ProjectSection from "./ProjectSection/ProjectSection";
import Services from "./Services/Services/Services";
import TimeLine from "./TimeLine/TimeLine";
const LandingPage = () => {
    return (
        <div>
        <div className="max-w-7xl md:mx-auto pb-10 mx-5">
        <LandingHero></LandingHero> 
        </div>  
        <div className="max-w-7xl md:mx-auto pb-10 mx-5">
        <Languages></Languages>
        </div>
        <div className="max-w-7xl md:mx-auto pb-10 mx-5">
        <Services></Services>
        </div>
        <div className="max-w-7xl md:mx-auto pb-10 mx-5">
        <TimeLine></TimeLine>
        </div>
        <ProjectSection></ProjectSection>
        <div className="max-w-7xl md:mx-auto pb-10 mx-5">
        <Contact></Contact>
        </div>
        </div>
    );
};

export default LandingPage;