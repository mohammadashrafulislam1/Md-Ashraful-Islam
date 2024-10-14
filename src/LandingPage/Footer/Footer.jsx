import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const navbar = (
        <ul className="flex gap-10 font-light justify-center">
            <li className="hover:text-white"><Link to="#">Home</Link></li>
            <li className="hover:text-white"><Link to="#">About</Link></li>
            <li className="hover:text-white"><Link to="#">Projects</Link></li>
            <li className="hover:text-white"><Link to="#">Contact</Link></li>
        </ul>
    );

    return (
    <div className="py-10 bg-[#000] ">
        <a className="normal-case text-xl text-white text-center flex justify-center mb-4 flex justify-center items-center gap-1 font-semibold"><span className="bg-[#0051ff] p-1">Md</span> Ashraf</a>
        <div className="text-white">{navbar}</div>
        <div className="flex justify-center gap-6 mt-3">
            <a href="https://www.facebook.com/profile.php?id=100013514229148" className="text-[#414141] text-xl"><FaFacebookF/></a>
            <a href="https://www.linkedin.com/in/mdashrafulislam12" className="text-[#414141] text-xl"><FaLinkedinIn/></a>
            <a href="https://www.instagram.com/the_ash_raf_" className="text-[#414141] text-xl"><FaInstagram/></a>
        </div>
    </div>
    );
};

export default Footer;
