import { useEffect, useState } from 'react';
import './featured.scss';
import ShortenedTex from './ShortenedText';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Featured = () => {
  const[post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts/random', {
          headers: {
            // If you have authentication, include the token here
            token: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTZiMDBhZTg1NzA3ZmEzNGU3NzUxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNDM3MzIzNCwiZXhwIjoxNzA2OTY1MjM0fQ.0iO0ldQc9UTu6tYqF7Nzzm8PhhZUe6sX_BrwaxGA-e8"
          },
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <div className='featured'>
        <img src={post.img || <Skeleton/>} alt="" />
        <div className='img-overlay'></div>
        <div className='featured-content'>
        <div className='icon'>
        <i class='bx bxs-hot bx-tada fire' ></i>
        {/* <span>Hot</span> */}
        </div>
        <h1>{post.title || <Skeleton count={4} />}</h1>
        {/* <ShortenedTex text={post.desc} maxLength={150}/> */}
        {/* <p>{post.desc}</p> */}
        <Link to={`/singlePost/${post._id}`} className='link'>
              <p className='btn'>Read More...</p>
          </Link>
        {/* <p className='btn'>Read More..</p> */}
        </div>
    </div>
  )
}

export default Featured