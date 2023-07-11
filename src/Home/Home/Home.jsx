import Navigation from "../../Shared/Navigation/Navigation";
import About from "../About/About";
import Blog from "../Blog/Blog";
import Hero from "../Hero/Hero";
import Projects from "../Projects/Projects";

const Home = () => {
    return (
    <div className="max-w-7xl mx-auto pb-10">
      <Navigation></Navigation>
    {/* Secion 1 */}
    <div className="flex gap-5 justify-center">
        <Hero></Hero>
        <About></About>
        <Projects></Projects>
    </div>   
    {/* Secion 2 */}
    <div>
        <Blog></Blog>
    </div>
        </div>
    );
};

export default Home;