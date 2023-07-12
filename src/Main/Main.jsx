import { Outlet } from "react-router-dom";
import Navigation from "../Shared/Navigation/Navigation";

const Main = () => {
    return (
        <div className="max-w-7xl md:mx-auto pb-10 mx-5">
         <Navigation></Navigation>  
         <Outlet></Outlet> 
        </div>
    );
};

export default Main;