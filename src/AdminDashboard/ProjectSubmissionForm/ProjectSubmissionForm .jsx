import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { TagsInput } from 'react-tag-input-component';
import Swal from 'sweetalert2';
// import { endPoint } from '../../forAll/forAll';

const ProjectSubmissionForm = () => {
  const apiUrl = `http://localhost:4000/projects`; // Backend API endpoint
 

  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [duration, setDuration] = useState('');
  const [challenges, setChallenges] = useState('');
  const [userName, setUserName] = useState('Md Ashraful Islam');
  const [userEmail, setUserEmail] = useState('mohammadashrafulislam33@gmail.com');
  const [projectImage, setProjectImage] = useState(null); // State for project image
  const [galleryImages, setGalleryImages] = useState([]); // State for gallery images
  const [isFeatured, setIsFeatured] = useState(false);
  const [mobileImage, setMobileImage] = useState(null); 
  const [tabletImage, setTabletImage] = useState(null);

  // State variables for client info
  const [clientInfo, setClientInfo] = useState({
    userName: '',
    userEmail: '',
    userSocialMedia: ''
  });

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // First, submit client info
    try {
      // Continue with project submission
      // Create FormData object to send form data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('projectCategory', projectCategory);
      formData.append('projectUrl', projectUrl);
      formData.append('githubUrl', githubUrl);
      formData.append('technologies', JSON.stringify(technologies));
      formData.append('duration', duration);
      formData.append('challenges', challenges);
      formData.append('userName', userName);
      formData.append('userEmail', userEmail);
      formData.append('isFeatured', isFeatured);
      formData.append('projectImage', projectImage);
      formData.append('mobileImage', mobileImage);
      formData.append('tabletImage', tabletImage);
      galleryImages.forEach((image) => {
        formData.append('galleryImages', image);
      });
      formData.append('clientInfo', clientInfo);

      // Send POST request to backend API
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Project submitted successfully:', data);
        // Show success message to the user
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Project submitted successfully!',
        });
        // Reset form fields after successful submission
        setTitle('');
        setDescription('');
        setProjectCategory('');
        setProjectUrl('');
        setGithubUrl('');
        setTechnologies([]);
        setDuration('');
        setChallenges('');
        setUserName('Md Ashraful Islam');
        setUserEmail('mohammadashrafulislam33@gmail.com');
        setProjectImage(null);
        setGalleryImages([]);
        setIsFeatured(false);
        setMobileImage(null);
        setTabletImage(null);
        setClientInfo({
          userName: '',
          userEmail: '',
          userSocialMedia: ''
        });
      } else {
        // Handle error response from the backend
        console.error('Failed to submit project:', response.statusText);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to submit project. Please try again later.',
        });
      }
    } catch (error) {
      // Handle network errors
      console.error('Error submitting project:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit project. Please try again later.',
      });
    }
  };

  // Functions to handle file input changes
  const handleMobileImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setMobileImage(selectedImage);
  };

  const handleTabletImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setTabletImage(selectedImage);
  };

  const handleProjectImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setProjectImage(selectedImage);
  };

  const handleGalleryImagesChange = (e) => {
    const selectedImages = e.target.files;
    setGalleryImages(Array.from(selectedImages));
  };

  return (
    <div className='w-full md:w-3/4 mx-auto p-10'>
      <h2 className="md:text-3xl font-bold my-6 text-center text-white text-2xl">Project Submission Form</h2>
      <form onSubmit={handleFormSubmit}>
      <hr />
        <div className="my-4">
          <label htmlFor="isFeatured" className="block text-gray-200 text-sm font-bold mb-2">
            Featured Project:
          </label>
          <div className='flex'>
          <input
            type="checkbox"
            id="isFeatured"
            checked={isFeatured}
            onChange={() => setIsFeatured(!isFeatured)}
            className="mr-2 toggle"
          />
          <span className="text-gray-200">Is this project featured?</span>
          </div>
        </div>
        <hr />
        <div className="my-4">
          <label htmlFor="title" className="block text-gray-200 text-sm font-bold mb-2">
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
        <hr />
        <div className="my-4">
          <label htmlFor="projectImage" className="block text-gray-200 text-sm font-bold mb-2">
            Project Image:
          </label>
          <input
            type="file"
            id="projectImage"
            accept="image/*"
            onChange={handleProjectImageChange}
            className="bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="galleryImages" className="block text-gray-200 text-sm font-bold mb-2">
            Add images for gallery (Multiple):
          </label>
          <input
            type="file"
            id="galleryImages"
            accept="image/*"
            onChange={handleGalleryImagesChange}
            multiple // Allow multiple image selection
            className="bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <hr />
        <div className="my-4">
        <label htmlFor="mobileImage" className="block text-gray-200 text-sm font-bold mb-2">
          Mobile Image:
        </label>
        <input
          type="file"
          id="mobileImage"
          accept="image/*"
          onChange={handleMobileImageChange}
          className="bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="my-4">
        <label htmlFor="tabletImage" className="block text-gray-200 text-sm font-bold mb-2">
          Tablet Image:
        </label>
        <input
          type="file"
          id="tabletImage"
          accept="image/*"
          onChange={handleTabletImageChange}
          className="bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <hr />
        <div className='my-4'>
          <label htmlFor='projectCategory' className='block text-gray-200 text-sm font-bold mb-2'>
            Project Category:
          </label>
          <select
            id='projectCategory'
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            required
            className='w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500'
          >
            <option value='' disabled>
              Select Project Category
            </option>
            <option value='Full Stack Web Development'>Full Stack Web Development</option>
            <option value='CMS'>CMS</option>
            <option value='Search Engine Optimization'>Search Engine Optimization</option>
            <option value='Web Design'>Web Design</option>
            <option value='Video Editing'>Video Editing</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <hr />
        <div className="my-4">
          <label htmlFor="description" className="block text-gray-200 text-sm font-bold mb-2">
            Project Description:
          </label>
          <ReactQuill
            value={description}
            onChange={(value) => setDescription(value)}
            modules={{
              toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean'],
                ['size'], 
                ['font'] 
                 
              ],
            }}
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike', 'blockquote',
              'list', 'bullet', 'indent',
              'link', 'image'
            ]}
            className='bg-white text-2xl rounded-lg border-none font-[poppins]'
            placeholder="Type your text here..."
          />
        </div>
        <div className="my-4">
          <label htmlFor="projectUrl" className="block text-gray-200 text-sm font-bold mb-2">
            Project URL:
          </label>
          <input
            type="text"
            id="projectUrl"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="githubUrl" className="block text-gray-200 text-sm font-bold mb-2">
            GitHub URL:
          </label>
          <input
            type="text"
            id="githubUrl"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="technologies" className="block text-gray-200 text-sm font-bold mb-2">
            Technologies Used:
          </label>
          <TagsInput
            value={technologies}
            onChange={setTechnologies}
            placeholder="Add technologies..."
          />
        </div>
        <div className="my-4">
          <label htmlFor="duration" className="block text-gray-200 text-sm font-bold mb-2">
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
        <div className="my-4">
          <label htmlFor="challenges" className="block text-gray-200 text-sm font-bold mb-2">
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
        <div className="my-4">
          <label htmlFor="userName" className="block text-gray-200 text-sm font-bold mb-2">
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
        <div className="my-4">
          <label htmlFor="userEmail" className="block text-gray-200 text-sm font-bold mb-2">
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
        <hr />
        <h1 className='text-white text-center font-bold mt-6 text-3xl'>CLIENT INFO</h1>
        <div className="my-4">
          <label htmlFor="userName" className="block text-gray-200 text-sm font-bold mb-2">
            Client Name:
          </label>
          <input
            type="text"
            id="userName"
            value={clientInfo.userName} // Update clientInfo state directly
            onChange={(e) => setClientInfo(prevState => ({ ...prevState, userName: e.target.value }))} // Update nested property
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="userEmail" className="block text-gray-200 text-sm font-bold mb-2">
            Client Email:
          </label>
          <input
            type="email"
            id="userEmail"
            value={clientInfo.userEmail} // Update clientInfo state directly
            onChange={(e) => setClientInfo(prevState => ({ ...prevState, userEmail: e.target.value }))} // Update nested property
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label htmlFor="userSocialMedia" className="block text-gray-200 text-sm font-bold mb-2">
            Client Social:
          </label>
          <input
            type="social"
            id="userSocialMedia"
            value={clientInfo.userSocialMedia} // Update clientInfo state directly
            onChange={(e) => setClientInfo(prevState => ({ ...prevState, userSocialMedia: e.target.value }))} // Update nested property
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
