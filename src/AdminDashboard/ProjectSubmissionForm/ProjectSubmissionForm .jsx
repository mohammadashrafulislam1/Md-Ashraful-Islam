import { useState } from 'react';

const ProjectSubmissionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [duration, setDuration] = useState('');
  const [challenges, setChallenges] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // For example, send the form data to a server or display a success message
    console.log('Form submitted:', {
      title,
      description,
      projectUrl,
      technologies,
      duration,
      challenges,
      userName,
      userEmail
    });
    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setProjectUrl('');
    setTechnologies([]);
    setDuration('');
    setChallenges('');
    setUserName('');
    setUserEmail('');
  };

  const handleTechnologyChange = (e) => {
    const selectedTechnologies = Array.from(e.target.selectedOptions, (option) => option.value);
    setTechnologies(selectedTechnologies);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold my-6 text-center text-white">Project Submission Form</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Project Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Project Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="14" cols="50"
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projectUrl" className="block text-gray-700 text-sm font-bold mb-2">
            Project URL:
          </label>
          <input
            type="text"
            id="projectUrl"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="technologies" className="block text-gray-700 text-sm font-bold mb-2">
            Technologies Used:
          </label>
          <select
            id="technologies"
            multiple
            value={technologies}
            onChange={handleTechnologyChange}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
            <option value="Next.JS">Next.JS</option>
            <option value="Express.JS">Express.JS</option>
            <option value="Redux">Redux</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Tailwind.CSS">Tailwind.CSS</option>
            <option value="Bootstrap">Bootstrap</option>
            <option value="WordPress">WordPress</option>
            <option value="Elementor">Elementor</option>
            <option value="Divi">Divi</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">
            Project Duration:
          </label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="challenges" className="block text-gray-700 text-sm font-bold mb-2">
            Challenges Faced:
          </label>
          <textarea
            id="challenges"
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 text-sm font-bold mb-2">
            Your Name:
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-gray-700 text-sm font-bold mb-2">
            Your Email:
          </label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="number-slide1 text-white py-3 px-4 hover:bg-blue-600 w-full my-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectSubmissionForm;
