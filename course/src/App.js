import './App.css';
import React from 'react'; 
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home/Home';
import Courses from './components/Courses/Courses';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Request from './components/Request/Request';
import Subscribe from './components/Payments/Subscribe';
import PaymentFail from './components/Payments/PaymentFail';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import NotFound from './components/Layout/NotFound';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChangePassword from './components/Profile/ChangePassword';
import Dashboard from './components/Admin/Dashboard/Dashboard';
// import ChangePassword from './components/Profile/ChangePassword';
import Header from './components/Layout/Header';

function App() {
  return (    
    <Router>  
      <Header />
      <Routes>
        <Route path="/" element= {< Home/>} /> 
        <Route path="/Courses" element= {< Courses/>} /> 
        <Route path="/Login" element= {< Login/>} /> 
        <Route path="/Register" element= {< Register/>} /> 
        <Route path="/ForgetPassword" element= {< ForgetPassword/>} /> 
        <Route path="/ResetPassword/:token" element= {< ResetPassword/>} />
        <Route path="/Request" element= {< Request/>} />
        <Route path="/Subscribe" element= {< Subscribe/>} /> 
        <Route path="/PaymentFail" element= {< PaymentFail/>} /> 
        <Route path="/PaymentSuccess" element= {< PaymentSuccess/>} /> 
        <Route path="/NotFound" element= {< NotFound/>} />
        <Route path="/Profile" element= {< Profile/>} /> 
        <Route path="/UpdateProfile" element= {< UpdateProfile/>} />
        <Route path="/ChangePassword" element= {< ChangePassword/>} />
        <Route path="/Admin/Dashboard" element= {< Dashboard/>} />
      </Routes> 
      {/* <Footer /> */}
    </Router>   
  );
}
   
export default App;
