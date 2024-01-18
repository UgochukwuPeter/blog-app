import { useState } from 'react';
import './login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
  const navigate = useNavigate();
const[formData, setFormData] = useState({
    email: '',
    password: '',
});
const[errors, setErrors] = useState({});

const handleChange =(e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};
const handleSubmit =async (e)=>{
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
        // Your registration logic here
        try {
          // Make API request to login
          const response =  await axios.post("https://mern-blog-app-7ied.onrender.com/api/auth/login", formData);
          // Store the access token in local storage
          localStorage.setItem('user', JSON.stringify(response.data));
          // Redirect to the home page after successful login
          toast.success("Login successful");
          navigate('/');
        } catch (err) {
          console.error('Login error:', err);
          console.error('Server error message:', err.response?.data?.message);
          // Handle login error if needed
          toast.error("Login failed");
        }
      } else {
        setErrors(validationErrors);
      }

};
const validateForm = (data) => {
    let errors = {};
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

  return (
    <div className='login'>
        <h1>Login Below</h1>
            <form onSubmit={handleSubmit}>
            <input type="text"  name='email' placeholder='email' value={formData.email} onChange={handleChange}  />
            {errors.email && <p className='errors'>{errors.email}</p>}
            <input type="password"  name='password' placeholder='password' value={formData.password} onChange={handleChange}/>
            {errors.password && <p className='errors'>{errors.password}</p>}
            <input type="submit" value='Login' />
        </form>
        

    </div>
  )
}

export default Login