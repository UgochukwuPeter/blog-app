import { useState } from 'react'
import './social.scss'
import { Link } from 'react-router-dom';
import Share from './Share';

const Social = () => {
  const[imgColor, setImgColor]  = useState('black');

  const blogTitle = "Lorem ipsum dolor sit amet.";
  const blogURL = "https://your-blog-url.com";

  const handleColor =()=>{
    const newColor = imgColor === 'black' ? 'red' : 'black';
    setImgColor(newColor);
  }
  return (
    <div className='social'>
      <div className='social-container'>
      {/* <Link to={{pathname:"/singlePost/" +_id}}  className='link'>
      <p>Read More...</p>
      </Link> */}
      <div className='icon'>
      <i onClick={handleColor} class='bx bxs-heart bx-tada'style={{ color: imgColor }} ></i>
      <Share title={blogTitle} url={blogURL}/>
      </div>
      </div>
    </div>
  )
}

export default Social