import logoImage from '../assets/Logo.jpeg';
import { useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import MenuLoginLayout from '../layout/MenuLayout';

export default function Login(){

    const[email_id, setEmail] = useState();
    const[password, setPassword] = useState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const auth = useAuth();
    const pages = [{title:"Home", path:"/"}, {title:"Register", path:"/signup"}];

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Validation logic
        let errors = {};

        if (!email_id) {
            errors.email = "Email is required";
        }
        if (!password) {
            errors.password = "Password is required";
        }

         // Set errors state
         setErrors(errors);
    
         // If there are errors, stop form submission
         if (Object.keys(errors).length > 0) {
             return;
         }

         // If no errors, proceed with form submission
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/login/",
                {
                email_id,
                password
                },
            );
            toast.success(data.message);
            alert(data.message);
    
            // Clear form fields
            setEmail("");
            setPassword("");

            /*const token = data.token;
            const restaurantId = data.restaurantId;

            // Save token to local storage or session storage
            localStorage.setItem("token", token);
            localStorage.setItem("restaurantId", restaurantId);
    
            // Redirect to dashboard
            navigate("/dashboard");*/
        } catch (error) {
            toast.error(error.response.data.message);
            alert(error.response.data.message);
        }
    }    

    return (
        <MenuLoginLayout pages={pages}>
        <div className="container-fluid">
            <div className="row">
            <div className="col-sm-5 px-0 d-none d-sm-block">
                <img src={logoImage} alt="Login image" />
            </div>
            <div className="col-sm-5 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
            <form className="login-form" onSubmit={handleSubmit}>

                <h3 className="fw-normal mb-3 pb-3" >Sign into your account</h3>

                <div data-mdb-input-init className="form-outline mb-4">
                <input type="email" value={email_id} onChange={(e)=>setEmail(e.target.value)} id="login-form-email" className="form-control form-control-lg" placeholder="Enter email"/>
                {errors.email && (<span className="error">{errors.email}</span>)}
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="login-form-pass" className="form-control form-control-lg" placeholder="Password"/>
                {errors.password && (<span className="error">{errors.password}</span>)}
                </div>

                <div className="pt-1 mb-4">
                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                </div>

                <p className="small mb-5 pb-lg-2"><a className="forgot" href="#!">Forgot password?</a></p>
                <p className="message-account">Don't have an account? <a href="/signup" className="link-info">Register here</a></p>

            </form>
            </div>
            </div>
            </div>
        </div>
        </MenuLoginLayout>
        
    );
}