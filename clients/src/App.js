import  Home from  "./home/Home";

import  './app.scss';
import SinglePost from "./home/SinglePost";
import Nav from "./components/Nav";
import CreatePost from "./home/CreatePost";
import Register from "./home/Register";
import Login from "./home/Login";
import { BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom';
import EditPost from "./home/EditPost";
import  { SkeletonTheme } from 'react-loading-skeleton';
function App() {
  return (
    <div className="app">
       <SkeletonTheme baseColor="#202020" highlightColor="#444">
     <Router>
      <Routes>
       <Route extact  path="/" element={<><Nav/><Home/></>} />
       <Route  path="/register" element={<><Nav/><Register/></>} />
       <Route  path="/login" element={<><Nav/><Login/></>} />
       <Route path="/create" element={<><Nav/><CreatePost/></>}/>
       <Route path="/singlePost/:postId" element={<><Nav/><SinglePost/></>}/>
       <Route path="/editPost/:postId" element={<><Nav/><EditPost/></>}/>
       </Routes>
     </Router>
     </SkeletonTheme>
    </div>
  );
}

export default App;
