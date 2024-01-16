import { useState } from 'react';
import './blogPost.scss';
import Social  from  './Social';
import ShortenedText from './ShortenedText';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const BlogPost = ({posts, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index of the first and last items to display
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  
    // Get the current posts to display
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    // Handle page changes
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

   
  
  return (
    <div className="blog-post">
        <h1>All Post</h1>
        <div className='blog-container'>
            {
                currentPosts.map((post)=>(
            <div key={post._id} className='blog-wrapper'>
              <img src={post.img || <Skeleton width={200} height={150}/>} alt="" /> 
              <p className='date'>Date: {post.date || <Skeleton count={1} />}</p>
              {/* <HandlePost/> */}
              <h1>{post.title || <Skeleton count={2}/>}</h1>
              <ShortenedText text={post.desc || <Skeleton count={3} />} className='desc' maxLength={150}/>
              <div className='link-container'>
              <Link to={`/singlePost/${post._id}`} className='link'>
                 <p>Read More...</p>
              </Link>
              {/* <p className='desc'>{post.desc}</p> */}
            <Social/>
            </div>
            </div>
            ))
            };
        </div>
        {/* Pagination buttons */}
      <div className='pageBtn'>
        {Array.from({ length: Math.ceil(posts.length / itemsPerPage) }).map(
          (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default BlogPost