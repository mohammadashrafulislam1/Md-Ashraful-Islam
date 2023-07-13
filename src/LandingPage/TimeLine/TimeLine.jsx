import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const TimeLine = () => {
  return (
    <div>
      <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div className="py-3 sm:max-w-xl sm:mx-auto w-full px-2 sm:px-0">
          <div className="relative text-gray-700 antialiased text-sm font-semibold">
            <div className="hidden sm:block w-1 bg-blue-500 absolute h-full left-1/2 transform -translate-x-1/2" />
            <div className="mt-6 sm:mt-0 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-start w-full mx-auto items-center">
                  <div className="w-full sm:w-1/2 sm:pr-8">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="p-4 bg-white rounded shadow"
                    >
                      I already completed 10+ projects. Some are full stack some are only front-end.
                    </motion.div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-600 border-white border-4 w-12 h-12 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                  <p className="h-5 w-5 text-white text-center">10+</p>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-0 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-end w-full mx-auto items-center">
                  <div className="w-full sm:w-1/2 sm:pl-8">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="p-4 bg-white rounded shadow"
                    >
                      I have more than 2 years of experience in front-end as well as roughly 1 year of experience in back-end.
                    </motion.div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-600 border-white border-4 w-12 h-12 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                  <p className="h-5 w-5 text-white text-center">2+</p>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-0 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-start w-full mx-auto items-center">
                  <div className="w-full sm:w-1/2 sm:pr-8">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="p-4 bg-white rounded shadow"
                    >
                      Worked as a freelancer with 10+ clients worldwide and gained knowledge from them.
                    </motion.div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-600 border-white border-4 w-12 h-12 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                  <p className="h-5 w-5 text-white text-center">10+</p>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-0">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-end w-full mx-auto items-center">
                  <div className="w-full sm:w-1/2 sm:pl-8">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="p-4 bg-white rounded shadow"
                    >
                      As I worked for global clients, I successfully completed their jobs and achieved 5-star ratings from them.
                    </motion.div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-600 border-white border-4 w-12 h-12 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="h-5 w-5 text-white flex items-center justify-center"
                  >
                    <FaStar />
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
