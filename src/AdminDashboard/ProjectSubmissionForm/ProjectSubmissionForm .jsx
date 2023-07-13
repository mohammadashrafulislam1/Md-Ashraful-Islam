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
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Project Submission Form</h2>
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
            className="w-full bg-white border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
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
            className="w-full bg-white border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
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
            className="w-full bg-white border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
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
            className="w-full bg-white border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
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
            className="w-full bg-white border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
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
            className="w-full bg-white border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
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
            className="w-full bg-white border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
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
            className="w-full bg-white border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectSubmissionForm;
