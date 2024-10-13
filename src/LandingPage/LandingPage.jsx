import { Helmet } from "react-helmet";
import ProjectSubmissionForm from "../AdminDashboard/ProjectSubmissionForm/ProjectSubmissionForm.jsx";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer.jsx";
import LandingHero from "./LandingHero/LandingHero";
import Languages from "./Languages/Languages";
import ProjectSection from "./ProjectSection/ProjectSection";
import Services from "./Services/Services/Services";
import TestimonialSection from "./TestimonialSection/TestimonialSection.jsx";
const LandingPage = () => {
    return (
        <div>
        <Helmet>
  <meta name="keywords" content="Full-Stack Developer, HTML, CSS, JavaScript, React, Node.js, AWS, MongoDB, Web Development, Next.js, Tailwind CSS, Express.js, CI/CD, DevOps" />
  <meta name="description" content="Md Ashraful Islam is a passionate Full-Stack Web Developer with expertise in React, Node.js, AWS, and creating innovative digital solutions." />
  <meta name="author" content="Md Ashraful Islam" />
  <meta property="og:title" content="Md Ashraful Islam - Full-Stack Web Developer" />
  <meta name="title" content="Md Ashraful Islam - Full-Stack Web Developer" />
  <meta property="og:description" content="Explore the portfolio of Md Ashraful Islam, a Full-Stack Web Developer specializing in React, Node.js, and AWS. Check out his latest projects and web solutions." />
  <meta property="og:image" content="https://media.licdn.com/dms/image/v2/D5603AQFcatqrqNAN-w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722368377220?e=1734566400&v=beta&t=GtTgg8hbCK71OAknGvgnV--kEJmJJu90REgKYv4-_Zw" />
  {/* <!-- Twitter Card for Sharing --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Md Ashraful Islam - Full-Stack Web Developer" />
    <meta name="twitter:description" content="Explore the portfolio of Md Ashraful Islam, a Full-Stack Developer specializing in React, Node.js, and AWS." />
    <meta name="twitter:image" content="https://media.licdn.com/dms/image/v2/D5603AQFcatqrqNAN-w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722368377220?e=1734566400&v=beta&t=GtTgg8hbCK71OAknGvgnV--kEJmJJu90REgKYv4-_Zw" />
</Helmet>

        <LandingHero></LandingHero> 
        <div className="max-w-7xl md:mx-auto pb-10 md:mx-5 ">
        <Languages></Languages>
        </div>
        <div className="max-w-7xl md:mx-auto pb-10 md:mx-5 relative mx-3">
        <Services></Services> 
        </div>
        <div className="max-w-7xl md:mx-auto pb-10 md:mx-5">
        <TestimonialSection></TestimonialSection>
        <ProjectSection></ProjectSection>
        </div>
        <div >
        <Contact></Contact>
        </div>
        <Footer></Footer>
        </div>
    );
};

export default LandingPage;