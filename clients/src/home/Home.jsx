import { useEffect, useState } from 'react';
import BlogPost from '../components/BlogPost';
import Featured from '../components/Featured';
import Nav from '../components/Nav';
import Recent from '../components/Recent';
import { AllPost } from '../dummyData';
import  './home.scss';
import axios from 'axios';

const Home = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const[content, setContent] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts', {
          headers: {
            // If you have authentication, include the token here
            token: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTZiMDBhZTg1NzA3ZmEzNGU3NzUxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNDM3MzIzNCwiZXhwIjoxNzA2OTY1MjM0fQ.0iO0ldQc9UTu6tYqF7Nzzm8PhhZUe6sX_BrwaxGA-e8"
          },
        });
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <div className='home'>
        <Featured/>
        <Recent/>
        <BlogPost posts={content}itemsPerPage={6}/>
    </div>
  )
}

export default Home;