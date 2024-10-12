import { FaCircle } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { useEffect } from "react";
import { motion } from "framer-motion";

const LandingHero = () => {
    const handleDownloadClick = () => {
        const cvLink = 'https://drive.google.com/file/d/1JWAGhu17aXFPqdah-DWzL4xEnNIAfMm2/view?usp=sharing';
        window.location.href = cvLink;
    };

    // Define different variants for scroll animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const itemVariantsSlow = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }, // Slower transition
    };

    const itemVariantsFade = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } }, // Fade-in effect
    };

    return (
        <motion.div
            className="md:flex md:flex-row items-center justify-center relative md:pt-0 pt-6 hero-section pb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Left side */}
            <div>
                <motion.div className="bg-gradient-to-r from-[#1111114b] backdrop-blur-md to-[#21212177] rounded-r-full p-4" variants={itemVariants}>
                    <h6 className="text-blue-700 flex items-center gap-3 text-[18px]">
                        <FaCircle className="text-[10px]" />
                        Full stack
                    </h6>
                    <p className="text-[12px] text-[#c4c4c4]">Web developer</p>
                </motion.div>
                <motion.div className="bg-gradient-to-r from-[#1111114b] backdrop-blur-md to-[#21212177] rounded-r-full p-4 md:mt-10 mt-3" variants={itemVariants}>
                    <h6 className="text-gray-400 flex items-center gap-3 text-[18px]">
                        <FaCircle className="text-[10px]" />
                        Say hello to
                    </h6>
                    <p className="text-[12px] text-white">mohammadashrafulislam33@gmail.com</p>
                </motion.div>
            </div>

            {/* Middle side */}
            <div className="text-center">
                <motion.img
                    src="https://i.ibb.co/XLZZBJh/20220902-193547.png"
                    alt="MD Ashraful Islam - professional full stack web developer, mern stack developer, seo exper"
                    className=""
                    variants={itemVariantsSlow} // Slower animation for image
                />
                <motion.h1 className="text-white text-5xl font-semibold mt-0" variants={itemVariants}>
                    MD Ashraful Islam
                </motion.h1>
                <motion.div variants={itemVariantsFade}> {/* Fade-in animation for typing animation */}
                    <TypeAnimation
                        sequence={[
                            'Experience in REACT.JS',
                            1000,
                            'Experience in MONGODB',
                            1000,
                            'Experience in NODE.JS',
                            1000,
                            'Experience in Express.JS',
                            1000,
                            'Experience in JAVASCRIPT',
                            1000,
                            'Experience in HTML',
                            1000,
                            'Experience in CSS',
                            1000,
                            'Experience in Redux',
                            1000,
                            'Experience in Next.JS',
                            1000,
                            'Experience in WORDPRESS',
                            1000,
                            'Experience in TAILWIND',
                            1000,
                            'Experience in BOOTSTRAP',
                            1000,
                            'Experience in PYTHON',
                            1000,

                        ]}
                        speed={50}
                        style={{ fontSize: '16px', color: "wheat" }}
                        repeat={Infinity}
                    />
                </motion.div>
                <motion.p className="text-gray-300" variants={itemVariants}>
                    Want to see my CV? <button className="btn btn-link text-blue-500" onClick={handleDownloadClick}>
                        Download CV
                    </button>
                </motion.p>
            </div>

            {/* Right side */}
            <div>
                <motion.div className="border-b border-[#c4c4c448] pb-4 md:text-end text-center md:mt-0 mt-10" variants={itemVariants}>
                    <h6 className="text-white text-xl">100%</h6>
                    <p className="text-[#c4c4c4]">Client Satisfaction</p>
                </motion.div>
                <motion.div className="border-b border-[#c4c4c448] pb-4 md:text-end text-center my-10" variants={itemVariants}>
                    <h6 className="text-white text-xl">30+</h6>
                    <p className="text-[#c4c4c4]">Completed Projects</p>
                </motion.div>
                <motion.div className="pb-4 md:text-end text-center" variants={itemVariants}>
                    <h6 className="text-white text-xl">5+</h6>
                    <p className="text-[#c4c4c4]">Years Experience</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LandingHero;
