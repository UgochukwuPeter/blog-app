import './createPost.scss';
import {imageDb} from '../Firebase';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import {v4} from 'uuid';
import axios from  'axios';
import { toast } from 'react-toastify';
const CreatePost = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const { accessToken } = userData;
  const [files, setFiles] = useState([]);
  const [postData, setPostData] = useState({
    date: '',
    title: '',
    desc: '',
    // Add more fields as needed
  });
  const [uploaded, setUploaded] = useState(0);

  const upload = async () => {
    try {
      const newPostData = { ...postData };

      for (const [index, file] of files.entries()) {
        const fileName = new Date().getTime() + file.label + file.file.name;
        const imgRef = ref(imageDb, `/items/${fileName}`);
        
        const snapshot = await uploadBytes(imgRef, file.file);
        const url = await getDownloadURL(imgRef);

        newPostData[file.label] = url;
        setUploaded((prev) => prev + 1);
      }

      setPostData(newPostData);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error('Error uploading or getting download URL:', error);
      toast.error("error uploading image");
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mern-blog-app-7ied.onrender.com/api/posts/', postData, {
        headers: {
          token: "Bearer " + accessToken
        },
      });

      console.log('Post created successfully:', response.data);
      toast.success("Post created successfully");
      // Reset state or clear the form after successful submission
      setFiles([]);
      setPostData({
        date: '',
        title: '',
        desc: '',
        // Add more fields as needed
      });
      setUploaded(0);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error("error creating post");
    }
  };

  return (
    <div className='create-post'>
      <h1>New Post</h1>
      <form className='form'>
        <input type='file' onChange={(e) => setFiles([{ file: e.target.files[0], label: 'img' }])} />
        <input type='date' name='date' onChange={handleChange} value={postData.date} />
        <input type='text' name='title' placeholder='Enter Title' onChange={handleChange} value={postData.title} />
        <textarea name='desc' cols='30' rows='10' placeholder='Enter text' onChange={handleChange} value={postData.desc} />
        {uploaded === files.length ? (
          <button onClick={handleSubmit}>Create</button>
        ) : (
          <button onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
};

export default CreatePost;