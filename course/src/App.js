import './App.css';
import React, { useEffect } from 'react'; 
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home/Home';
import Courses from './components/Courses/Courses';
import CoursePage from './components/CoursePage/CoursePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Request from './components/Request/Request';
import Subscribe from './components/Subscribe/Subscribe';
import NotFound from './components/Layout/NotFound';
import Loader from './components/Layout/Loader';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChangePassword from './components/Profile/ChangePassword';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Users from './components/Admin/Users/Users';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from "react-hot-toast"
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from "protected-route-react";

function App() {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  const {isAuthenticated, user, message, error, loading} = useSelector(state=>state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch({ type: 'clearError'});
    }

    if(message) {
      toast.success(message);
      dispatch({ type: 'clearMessage'});
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])
  return (    
    <Router>  
      {
        loading  ? ( <Loader />) : (
          <>
          <Header isAuthenticated={isAuthenticated} user={user}/>
      <Routes>
        <Route path="/" element= {< Home/>} /> 
        <Route path="/Courses" element= {< Courses/>} />
        <Route path="/course/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <CoursePage user={user} /> </ProtectedRoute>} /> 
        <Route path="/Login" element= {<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"> < Login/> </ProtectedRoute>} /> 
        <Route path="/Register" element= {<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"> < Register/> </ProtectedRoute>} /> 
        <Route path="/ForgetPassword" element= {<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"> < ForgetPassword/> </ProtectedRoute>} /> 
        <Route path="/ResetPassword/:token" element= {<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"> < ResetPassword/> </ProtectedRoute>} /> 
        <Route path="/Request" element= {< Request/>} />
        <Route path="/Subscribe" element= {<ProtectedRoute isAuthenticated={isAuthenticated} > < Subscribe/> </ProtectedRoute>} /> 
        <Route path="/NotFound" element= {< NotFound/>} />
        <Route path="/Profile" element= {<ProtectedRoute isAuthenticated={isAuthenticated} > < Profile user={user}/> </ProtectedRoute>} /> 
        <Route path="/UpdateProfile" element= {<ProtectedRoute isAuthenticated={isAuthenticated} > < UpdateProfile user={user}/> </ProtectedRoute>} />
        <Route path="/ChangePassword" element= {<ProtectedRoute isAuthenticated={isAuthenticated} > < ChangePassword/> </ProtectedRoute>} />
        <Route path="/Admin/Dashboard" element= {<ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === 'admin'} > < Dashboard/> </ProtectedRoute>} />
        <Route path="/Admin/CreateCourse" element= {<ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === 'admin'} > < CreateCourse/> </ProtectedRoute>} />
        <Route path="/Admin/Users" element= {<ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === 'admin'} > < Users/> </ProtectedRoute>} />
        <Route path="/Admin/Courses" element= {<ProtectedRoute adminRoute={true} isAuthenticated={isAuthenticated} isAdmin={user && user.role === 'admin'} > < AdminCourses/> </ProtectedRoute>} />
      </Routes> 
      <Footer />
      <Toaster />
          </>
        )
      }
    </Router>   
  );
}
   
export default App;
