import { Link, useNavigate } from 'react-router-dom';
import  './nav.css';
import   {useState} from 'react';
import { toast } from 'react-toastify';
const Nav = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  
  // const user = false;
  const[isScrolled, setIsScrolled] = useState();
  const [isActive, setIsActive] = useState(false);

  window.onscroll =()=>{
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
}
const toggleActiveClass =()=>{
  setIsActive(!isActive);
};

//clean up function to remove the active class
const removeActive =()=>{
  setIsActive(false);
}

const signout =()=>{
  localStorage.removeItem('user');
  navigate('/');
  return toast.success("Logout successful");
}
  return (
    <div className={isScrolled ? 'nav scrolled': 'nav'}>
        <div className='nav-container'>
            <Link to="/" className='link'>
            <p className='nav-logo'>CodeIt-<span>Blog</span></p>
            </Link>
            
            <div className={`${"nav-link"} ${isActive ? "active" : ""}`}>
                <ul>
                    <li onClick={removeActive}><Link  to="/" className='link'><span className='nav-items'>Home</span></Link></li>
                    <li onClick={removeActive}><Link to='/about' className='link'><span className='nav-items'>About</span></Link></li>
                    <li onClick={removeActive}><Link to='/contact' className='link'><span className='nav-items'>Contact</span></Link></li>
                    {
                      userData ? (
                        <li onClick={removeActive}><Link to='/create' className='link'><span className='nav-items'>Create</span></Link></li>
                      ): ""
                    }
                    {
                      userData ? "" : <Link onClick={removeActive} to='/register' className='link link-mobile'><p className='signout-mobile'>Become A Blogger</p></Link>
                    } 
                </ul>
            </div>
            {
              userData ?(
                <div className={`${"nav-status"} ${isActive ? "active" : ""}`}>
                <p onClick={signout} className='signout-profile'>Signout</p>
                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="" />
                </div>
              ): <Link to='/register' className='link'><p className='signout'>Become A Blogger</p></Link>
            }
            <div className={`${"hambugger"} ${isActive ? "active" : ""}`} onClick={toggleActiveClass}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            
            </div>
    </div>
  )
}

export default Nav