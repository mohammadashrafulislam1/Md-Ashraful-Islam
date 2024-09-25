import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import { endPoint } from "../forAll/forAll";

const imgHostingToken = import.meta.env.VITE_img_upload_token;
const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${imgHostingToken}`;

const EditProject = ({ projectId, onClose  }) => {
console.log(projectId, onClose)
// State variables for form fields
const [project, setProject] = useState(null)
const [loading, setLoading] = useState(true);
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
useEffect(()=>{
  const fetchData = async() =>{
   try{
     const getProjectResponse = await fetch(`${endPoint}/projects/${projectId}`)
     const getProjectsData = await getProjectResponse.json();
     setProject(getProjectsData)
     setLoading(false);
     if (getProjectsData) {
      setTitle(getProjectsData.title);
      setDescription(getProjectsData.description)
      setProjectImage(getProjectsData.projectImage)
      setMobileImage(getProjectsData.mobileImage)
      setTabletImage(getProjectsData.tabletImage)
      setIsFeatured(getProjectsData.isFeatured)
      setProjectUrl(getProjectsData.projectUrl)
      setGithubUrl(getProjectsData.githubUrl)
      if (getProjectsData?.technologies) {
        const technologiesArray = JSON.parse(getProjectsData.technologies);
        setTechnologies(technologiesArray);
    }
    // Set gallery images
    if (getProjectsData?.galleryImages) {
                    setGalleryImages(getProjectsData.galleryImages);
                }
    setDuration(getProjectsData.duration)
    setChallenges(getProjectsData.challenges)
  }
   }
   catch (error) {
    console.error('Error fetching data:', error);
    }
  };
  fetchData()
}, [projectId])
// Function to handle file input changes and upload images to ImgBB
const handleImageUpload = async (imageFile) => {
try {
const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch(imgHostingUrl, {
method: 'POST',
body: formData,
});

if (response.ok) {
const data = await response.json();
return data.data.url; // Return the URL of the uploaded image
} else {
throw new Error('Failed to upload image');
}
} catch (error) {
console.error('Error uploading image:', error);
return null;
}
};

const handleProjectImageChange = async (e) => {
const selectedImage = e.target.files[0];
const imageUrl = await handleImageUpload(selectedImage);
if (imageUrl) {
setProjectImage(imageUrl);
}
};

const handleMobileImageChange = async (e) => {
const selectedImage = e.target.files[0];
const imageUrl = await handleImageUpload(selectedImage);
if (imageUrl) {
setMobileImage(imageUrl);
}
};

const handleTabletImageChange = async (e) => {
const selectedImage = e.target.files[0];
const imageUrl = await handleImageUpload(selectedImage);
if (imageUrl) {
setTabletImage(imageUrl);
}
};
const handleGalleryImagesChange = (e) => {
const selectedImages = e.target.files;
const maxSize = 20 * 1024 * 1024; const invalidFiles = Array.from(selectedImages).filter(file => file.size > maxSize);

if (invalidFiles.length > 0) {
// Display error message to the user
alert('One or more selected files exceed the maximum allowed size (10 MB). Please choose smaller files.');
// Clear the file input field
e.target.value = null;
} else {
// Process valid files
setGalleryImages(Array.from(selectedImages));
}
};

const handleFormUpdate = async (e) => {
e.preventDefault();
  console.log('clicking')
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

setLoading(true)

console.log(formData)
// Send POST request to backend API
const response = await fetch(`${endPoint}/projects/${projectId}`, {
method: 'PUT',
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
setTabletImage(null)
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
} finally{
setLoading(false)
}
};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  <div className="bg-white rounded-xl p-8 shadow-lg relative max-w-md w-full text-black overflow-y-auto max-h-[90vh]">
      <button
        className="absolute top-9 right-6 text-gray-800 font-bold hover:text-black"
        onClick={onClose} // Call the onClose function to hide the modal
      >
        X
      </button>
      {loading ? (
        <>Loading... <span className="loading loading-ring loading-lg"></span></>
      ) :
    <form onSubmit={handleFormUpdate} className="rounded-lg text-black">
<hr />
<div className="my-4">
<label htmlFor="isFeatured" className="block text-black text-sm font-bold mb-2">
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
<span className="text-black">Is this project featured?</span>
</div>
</div>
<hr />
<div className="my-4">
<label htmlFor="title" className="block text-black text-sm font-bold mb-2">
Project Title:
</label>
<input
type="text"
id="title"
value={title}
onChange={(e) => setTitle(e.target.value)}
className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
/>
</div>
<hr />
<div className="my-4">
<label htmlFor="projectImage" className="block text-black text-sm font-bold mb-2">
Project Image:
</label>
<img src={projectImage} alt="" className="w-[20%] mb-2"/>
<input
type="file"
id="projectImage"
accept="image/*"
onChange={handleProjectImageChange}
className="bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
/>
</div>
<div className="my-4">
<label htmlFor="galleryImages" className="block text-black text-sm font-bold mb-2">
Add images for gallery (Multiple):
</label>
<div className="image-container flex gap-2">
     {galleryImages.map((imageUrl, index) => (
      <img key={index} src={imageUrl} alt={`Gallery Image ${index + 1}`} className="w-[20%] mb-2" /> ))}
                    </div>
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
<label htmlFor="mobileImage" className="block text-black text-sm font-bold mb-2">
Mobile Image:
</label>
<img src={mobileImage} alt="" className="w-[20%] mb-2"/>
<input
type="file"
id="mobileImage"
accept="image/*"
onChange={handleMobileImageChange}
className="bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
/>
</div>
<div className="my-4">
<label htmlFor="tabletImage" className="block text-black text-sm font-bold mb-2">
Tablet Image:
</label>
<img src={tabletImage} alt="" className="w-[20%] mb-2"/>
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
<label htmlFor='projectCategory' className='block text-black text-sm font-bold mb-2'>
Project Category:
</label>
<p>Default: {project?.projectCategory}</p>
<select
id='projectCategory'
value={projectCategory}
onChange={(e) => setProjectCategory(e.target.value)}
className='w-full bg-white border border-gray-300 rounded-lg py-2 mt-2 px-3 focus:outline-none focus:border-blue-500'
>
<option value="" disabled>Select A Category</option>
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
<label htmlFor="description" className="block text-black text-sm font-bold mb-2">
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
<label htmlFor="projectUrl" className="block text-black text-sm font-bold mb-2">
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
<label htmlFor="githubUrl" className="block text-black text-sm font-bold mb-2">
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
<label htmlFor="technologies" className="block text-black text-sm font-bold mb-2">
Technologies Used:
</label>
<TagsInput
value={technologies}
onChange={setTechnologies}
placeholder="Add technologies..."
/>
</div>
<div className="my-4">
<label htmlFor="duration" className="block text-black text-sm font-bold mb-2">
Project Duration:
</label>
<input
type="text"
id="duration"
value={duration}
onChange={(e) => setDuration(e.target.value)}
className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
/>
</div>
<div className="my-4">
<label htmlFor="challenges" className="block text-black text-sm font-bold mb-2">
Challenges Faced:
</label>
<textarea
id="challenges"
value={challenges}
onChange={(e) => setChallenges(e.target.value)}
className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
/>
</div>
<div className="my-4">
<label htmlFor="userName" className="block text-black text-sm font-bold mb-2">
Your Name:
</label>
<input
type="text"
id="userName"
value={userName}
onChange={(e) => setUserName(e.target.value)}
className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
/>
</div>
<div className="my-4">
<label htmlFor="userEmail" className="block text-black text-sm font-bold mb-2">
Your Email:
</label>
<input
type="email"
id="userEmail"
value={userEmail}
onChange={(e) => setUserEmail(e.target.value)}
className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
/>
</div>
<button type="submit" className="btn btn-primary">Update Project</button>
</form>
      
}</div>
  </div>
  );
};

export default EditProject;
