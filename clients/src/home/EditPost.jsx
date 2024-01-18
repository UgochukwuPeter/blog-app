import { useParams } from 'react-router-dom';
import './editPost.scss';
import axios  from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ... (imports)

const EditPost = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const { accessToken } = userData;
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [postData, setPostData] = useState({
    date: '',
    title: '',
    desc: '',
    // Add more fields as needed
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://mern-blog-app-7ied.onrender.com/api/posts/find/${postId}`, {
          headers: {
            token: "Bearer " + accessToken
          },
        });
        // Set initial state for postData based on fetched post
        setPost(response.data);
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/posts/${postId}`, postData, {
        headers: {
          token: "Bearer " + accessToken
        },
      });

      // console.log('Post updated successfully:', response.data);
      // Reset state or clear the form after successful submission
      toast.success("Post updated successfully");
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error("Error updating post");
    }
  };

  if (!post) {
    // You can render a loading spinner or message while waiting for the data
    return <p>Loading...</p>;
  }

  return (
    <div className='editPost'>
      <img src={post.img} alt="" />
      <form>
        <label>Date:</label>
        <input type="text" className='form-input' name='date' placeholder={post.date} onChange={handleChange} value={postData.date} />
        <label htmlFor="">Title</label>
        <input type="text" className='form-input' name='title' placeholder={post.title} onChange={handleChange} value={postData.title} />
        <label htmlFor="">Content</label>
        <textarea className='form-input' name='desc' cols="30" rows="10" onChange={handleChange} value={postData.desc}>
          {post.desc}
        </textarea>
        <button type='submit' onClick={handleSubmit}>Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
