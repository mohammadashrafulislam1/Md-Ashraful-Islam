import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const TimeLine = () => {
  return (
    <div className="min-h-screen py-8 flex flex-col justify-center">
      <div className="container mx-auto w-full px-4">
        <div className="relative text-gray-700 antialiased text-sm font-semibold">
          {/* Vertical Line */}
          <div className="hidden sm:block w-1 bg-blue-500 absolute h-full left-1/2 transform -translate-x-1/2" />
          
          {/* Timeline Item */}
          {[
            {
              text: "I already completed 10+ projects. Some are full stack some are only front-end.",
              iconText: "10+",
              delay: 0
            },
            {
              text: "I have more than 2 years of experience in front-end as well as roughly 1 year of experience in back-end.",
              iconText: "2+",
              delay: 0.2
            },
            {
              text: "Worked as a freelancer with 10+ clients worldwide and gained knowledge from them.",
              iconText: "10+",
              delay: 0.4
            },
            {
              text: "As I worked for global clients, I successfully completed their jobs and achieved 5-star ratings from them.",
              iconText: <FaStar />,
              delay: 0.6
            }
          ].map((item, index) => (
            <div className="mt-6 sm:mt-0 sm:mb-12" key={index}>
              <div className={`flex flex-col sm:flex-row items-center ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                <div className={`flex w-full mx-auto items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: item.delay }}
                      className="p-6 bg-white rounded-lg shadow-lg"
                    >
                      {item.text}
                    </motion.div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-600 border-white border-4 w-12 h-12 absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: item.delay + 0.2 }}
                    className="text-white text-lg"
                  >
                    {item.iconText}
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
