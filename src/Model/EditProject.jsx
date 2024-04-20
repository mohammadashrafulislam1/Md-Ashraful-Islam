import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";

const imgHostingToken = import.meta.env.VITE_img_upload_token;
const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${imgHostingToken}`;

const EditProject = ({ projectId }) => {
console.log(projectId)
// State variables for form fields
const [isSubmitting, setIsSubmitting] = useState(false);
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

setIsSubmitting(true)

console.log(formData)
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
clientName: '',
clientEmail: '',
clientSocialMedia: ''
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
} finally{
setIsSubmitting(false)
}
};



  return (
    <div className="modal-box rounded-lg">
    <form method="dialog">
    <form onSubmit={handleFormUpdate} method="dialog" className="rounded-lg text-black">
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
className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
/>
</div>
<button type="submit" className="btn btn-primary">Update Project</button>
</form>

      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
  );
};

export default EditProject;
