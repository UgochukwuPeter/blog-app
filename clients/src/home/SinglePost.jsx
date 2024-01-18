import { Link, useParams } from "react-router-dom";
// import HandlePost from "../components/HandlePost";
// import { SinglePostData, UserComments } from "../dummyData";
import "./singlePost.scss";
import { useEffect, useState } from "react";
import axios  from  'axios';
import { Edit } from "@mui/icons-material";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SinglePost = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://mern-blog-app-7ied.onrender.com/api/posts/find/${postId}`,
        {
          headers: {
            // If you have authentication, include the token here
            // token: "Bearer " +  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTZiMDBhZTg1NzA3ZmEzNGU3NzUxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNDM3MzIzNCwiZXhwIjoxNzA2OTY1MjM0fQ.0iO0ldQc9UTu6tYqF7Nzzm8PhhZUe6sX_BrwaxGA-e8"
          },
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  console.log(post);
  if (!post) {
    // You can render a loading spinner or message while waiting for the data
    return <p>Loading...</p>;
  }

  return (
    <div className="singlePost">
      <img src={post.img || <Skeleton />} alt="" />
      <div className="handle">
        <p className="date">Date: {post.date || <Skeleton />}</p>
        {
          userData ? <Link to={`/editPost/${post._id}`}  className='link'><Edit className='icons'/></Link> : ""
        }
      </div>
      <h1 className="title">{post.title || <Skeleton />}</h1>
      <p className="desc">{post.desc || <Skeleton />}</p>
    </div>
  );
};

export default SinglePost;
