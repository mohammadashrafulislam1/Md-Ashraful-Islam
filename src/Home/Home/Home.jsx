import Navigation from "../../Shared/Navigation/Navigation";
import About from "../About/About";

const Home = () => {
    return (
    <div className="max-w-7xl mx-auto">
      <Navigation></Navigation>
    <div>
        <About></About>
    </div>   
        </div>
    );
};

export default Home;