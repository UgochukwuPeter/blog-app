import { useState } from 'react';
import './register.scss';
import Login from './Login';
import { Link, redirect } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
const[formData, setFormData] = useState({
    username:  '',
    email: '',
    password: '',
});
const[errors, setErrors] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);

const handleChange =(e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};
const handleSubmit = async (e)=>{
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
        // Your registration logic here
        try {
          await axios.post("auth/register", {...formData });
          redirect('/login');
        } catch (err) {
          console.error("Registration error:", err);
          console.error("Server error message:", err.response?.data?.message);
        }
        console.log('Form is valid. Submitting...');
        setIsSubmitted(true);
      // Reset the form after successful submission if needed
      setFormData({
        username: '',
        email: '',
        password: ''
      });
      } else {
        setErrors(validationErrors);
      }

};
const validateForm = (data) => {
    let errors = {};
    if (!data.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is not valid';
    }
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };
  console.log(formData)
  return (
    <div className='register'>
        <h1>Register Below</h1>
        {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
            <input type="text" name='username' placeholder='username' value={formData.username} onChange={handleChange} />
            {errors.username && <p className='errors'>{errors.username}</p>}
            <input type="text"  name='email' placeholder='email' value={formData.email} onChange={handleChange}  />
            {errors.email && <p className='errors'>{errors.email}</p>}
            <input type="password"  name='password' placeholder='password' value={formData.password} onChange={handleChange}/>
            {errors.password && <p className='errors'>{errors.password}</p>}
            <input type="submit" value='Register' />
            <span className='exist'>Already have an account? <Link to="/login">Login</Link></span>
        </form>
        ): (
        <div>
          <p>Registration successful! Thank you for registering.</p>
          <Link to="/login" className='link'><p className='login'>Login</p></Link>
          {/* You can include additional content or redirect the user after successful registration. */}
        </div>
        )}
        

    </div>
  )
}

export default Register