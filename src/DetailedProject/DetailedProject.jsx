import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../forAll/forAll";
import Footer from "../LandingPage/Footer/Footer";

const DetailedProject = () => {
  const { id } = useParams();
  useEffect(() => {
    const fetchProperty = async () => {
      const response = await fetch(`${endPoint}/projects/${id}`);
      const propertyData = await response.json();
      console.log(propertyData);
    }
    fetchProperty()

},[id])
    return (
    <div>
    
          {/*Footer  */}
          <Footer></Footer>
    </div>
    );
};

export default DetailedProject;