import { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

const img_hosting_token = import.meta.env.VITE_img_upload_token;

const ProjectSubmissionForm = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [duration, setDuration] = useState('');
  const [challenges, setChallenges] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [projectImage, setProjectImage] = useState(null); // State for project image
  const [galleryImages, setGalleryImages] = useState([]); // State for gallery images

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let projectImgURL = ''; // Define projectImgURL within the scope
    let galleryImgURLs = []; // Define galleryImgURLs within the scope

    // Upload the project image if one is selected
    if (projectImage) {
      const formData = new FormData();
      formData.append('image', projectImage);

      try {
        const response = await fetch(img_hosting_url, {
          method: 'POST',
          body: formData,
        });
        const imgResponse = await response.json();
        console.log('Project Image Upload Response:', imgResponse);
        if (imgResponse.success) {
          projectImgURL = imgResponse.data.display_url; // Set projectImgURL if the upload is successful
        }
      } catch (error) {
        console.error('Error uploading project image:', error);
      }
    }

    // Upload multiple gallery images if they are selected
    if (galleryImages.length > 0) {
      try {
        for (const imageFile of galleryImages) {
          const formData = new FormData();
          formData.append('image', imageFile);

          const response = await fetch(img_hosting_url, {
            method: 'POST',
            body: formData,
          });

          const imgResponse = await response.json();
          console.log('Gallery Image Upload Response:', imgResponse);

          if (imgResponse.success) {
            galleryImgURLs.push(imgResponse.data.display_url);
          }
        }
      } catch (error) {
        console.error('Error uploading gallery images:', error);
      }
    }

    // Perform the rest of the form submission logic here
    console.log('Form submitted:', {
      title,
      description,
      projectUrl,
      githubUrl,
      technologies,
      duration,
      challenges,
      userName,
      userEmail,
      projectImage: projectImgURL, // Now projectImgURL is defined and contains the project image URL
      galleryImages: galleryImgURLs, // Gallery image URLs
    });

    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setProjectUrl('');
    setGithubUrl('');
    setTechnologies([]);
    setDuration('');
    setChallenges('');
    setUserName('');
    setUserEmail('');
    setProjectImage(null); // Reset the selected project image
    setGalleryImages([]); // Reset the selected gallery images
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-200 text-sm font-bold mb-2">
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
          <label htmlFor="projectUrl" className="block text-gray-200 text-sm font-bold mb-2">
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
          <label htmlFor="githubUrl" className="block text-gray-200 text-sm font-bold mb-2">
            GitHub URL:
          </label>
          <input
            type="text"
            id="githubUrl"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            required
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="technologies" className="block text-gray-200 text-sm font-bold mb-2">
            Technologies Used:
          </label>
          <TagsInput
            value={technologies}
            onChange={setTechnologies}
            placeholder="Add technologies..."
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <button type="submit" className="number-slide1 text-white py-3 px-4 hover:bg-blue-600 w-full my-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectSubmissionForm;
