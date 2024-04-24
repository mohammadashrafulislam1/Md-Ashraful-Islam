import React from 'react';

const Development = () => {
  return (
    <div>
      <h1 className="text-orange-400 md:text-4xl font-semibold text-2xl mb-5">As a Web Developer:</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-white text-2xl font-semibold mb-4">Front-end Technology:</h2>
        <p className="text-white">
          I specialize in HTML, CSS, JavaScript, and React.js for building interactive and responsive user interfaces.
          Additionally, I have experience with front-end tools like WordPress with Elementor for creating dynamic websites.
        </p>
      </div>
      <div className="bg-gray-800 rounded-lg p-6 mt-5">
        <h2 className="text-white text-2xl font-semibold mb-4">Back-end Technology:</h2>
        <p className="text-white">
          My back-end technology stack includes Express.js and Node.js. I work with MongoDB, a NoSQL database, for data storage
          and utilize Firebase for authentication. I am also familiar with Next.js for server-side rendering and building
          scalable web applications.
        </p>
      </div>
    </div>
  );
};

export default Development;
