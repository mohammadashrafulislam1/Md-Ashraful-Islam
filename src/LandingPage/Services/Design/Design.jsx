import React from 'react';

const Design = () => {
  return (
    <div>
      <h1 className="text-orange-400 text-4xl font-semibold mb-5">Web Design:</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-white text-2xl font-semibold mb-4">User-Centered Design:</h2>
        <p className="text-white">
          I believe in creating designs that prioritize the user experience. I focus on understanding the target audience
          and designing interfaces that are intuitive, visually appealing, and accessible across different devices.
        </p>
      </div>
      <div className="bg-gray-800 rounded-lg p-6 mt-5">
        <h2 className="text-white text-2xl font-semibold mb-4">Visual Design:</h2>
        <p className="text-white">
          I have an eye for aesthetics and pay attention to the visual details of a design. I create visually engaging 
          layouts, select appropriate color schemes, and incorporate effective typography to enhance the overall design 
          aesthetics.
        </p>
      </div>
    </div>
  );
};

export default Design;
