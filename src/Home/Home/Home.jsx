import Navigation from "../../Shared/Navigation/Navigation";
import About from "../About/About";
import Blog from "../Blog/Blog";
import Contact from "../Contact/Contact";
import Hero from "../Hero/Hero";
import MySkills from "../MySkils/MySkils";
import MyWork from "../MyWork/MyWork";
import Projects from "../Projects/Projects";
import Socials from "../Socials/Socials";

const Home = () => {
    return (
    <div className="max-w-7xl mx-auto pb-10 mx-10">
      <Navigation></Navigation>
    {/* Secion 1 */}
    <div className="md:flex gap-5 justify-center">
        <Hero></Hero>
        <About></About>
        <Projects></Projects>
    </div>   
    {/* Secion 2 */}
    <div className="md:flex gap-5 justify-center my-5">
        <Blog></Blog>
        <MySkills></MySkills>
        <Socials></Socials>
    </div>
    {/* Section 3 */}
    <div className="md:flex gap-5 justify-center">
        <MyWork></MyWork>
        <Contact></Contact>
    </div>
        </div>
    );
};

export default Home;