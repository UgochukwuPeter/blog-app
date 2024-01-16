import Social from './Social';
import './recent.scss';
// import dummyData, { NewPost, RecentPost } from '../dummyData';
import ShortenedText from './ShortenedText';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios  from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Recent = () => {
  const[content, setContent] = useState([]);
  const[posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('posts/newest', {
          headers: {
            // If you have authentication, include the token here
            // token: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTZiMDBhZTg1NzA3ZmEzNGU3NzUxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNDM3MzIzNCwiZXhwIjoxNzA2OTY1MjM0fQ.0iO0ldQc9UTu6tYqF7Nzzm8PhhZUe6sX_BrwaxGA-e8"
          },
        });
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts/two', {
          headers: {
            // If you have authentication, include the token here
            // token: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTZiMDBhZTg1NzA3ZmEzNGU3NzUxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNDM3MzIzNCwiZXhwIjoxNzA2OTY1MjM0fQ.0iO0ldQc9UTu6tYqF7Nzzm8PhhZUe6sX_BrwaxGA-e8"
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <div className='recent'>
      <h1>Recent Blog Posts</h1>
      <div className='recent-container'>
        <div className='left'>
            <div className='wrapper'>
                  <div key={content._id}>
                  <img src={content.img || <Skeleton width={200} height={150}/>} alt={`Post ${content._id}`}/>
                 <p className='date'>Date: {content.date || <Skeleton count={1}/>}</p>
                 <h1>{content.title || <Skeleton count={2}/> }</h1>
                 {/* <ShortenedText text={content.desc} className='desc' maxLength={200}/> */}
                 {/* <p>{content.desc}</p> */}
               </div>
            </div>
            <div className='link-container'>
              <Link to={`/singlePost/${content._id}`} className='link'>
                 <p>Read More...</p>
              </Link>
            <Social/>
            </div>
        </div>
        <div className='right'>
            <div className='right-wrapper'>
              {
                posts.map((post)=>(
                  <div key={post._id} className='post'>
                  <img src={post.img || <Skeleton width={200} height={150}/>} alt={`Post ${post.id}`} />
                  <div className='right-content'>
                <p className='date'>Date: {post.date || <Skeleton count={1}/>}</p>
                <h1>{post.title|| <Skeleton count={2}/>}</h1>
                <ShortenedText text={post.desc || <Skeleton count={2}/>} className='desc' maxLength={150}/>
                {/* <p>{post.desc}</p> */}
                <div className='link-container'>
              <Link to={`/singlePost/${post._id}`} className='link'>
                 <p>Read More...</p>
              </Link>
            <Social/>
            </div>
              </div>
              </div>
              ))
              }
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Recent