import ProjectSubmissionForm from "../AdminDashboard/ProjectSubmissionForm/ProjectSubmissionForm ";
import Contact from "./Contact/Contact";
import LandingHero from "./LandingHero/LandingHero";
import Languages from "./Languages/Languages";
import Services from "./Services/Services/Services";
import TimeLine from "./TimeLine/TimeLine";
const LandingPage = () => {
    return (
        <div>
        <LandingHero></LandingHero> 
        <Languages></Languages>
        <Services></Services>
        <TimeLine></TimeLine>
        <Contact></Contact>
        <ProjectSubmissionForm></ProjectSubmissionForm>
        </div>
    );
};

export default LandingPage;