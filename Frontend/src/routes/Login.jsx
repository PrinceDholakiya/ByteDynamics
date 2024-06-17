import logoImage from '../assets/Logo.jpeg';
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Validation logic
        let errors = {};

        if (!email) {
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
                "http://localhost:4000/api/v1/login",
                {
                email,
                password
                },
                {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                }
            );
            toast.success(data.message);
    
            // Clear form fields
            setEmail("");
            setPassword("");
    
            // Redirect to login page
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }    

    return (
        <div class="container-fluid">
            <div class="row">
            <div class="col-sm-5 px-0 d-none d-sm-block">
                <img src={logoImage} alt="Login image" />
            </div>
            <div class="col-sm-5 text-black">
            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
            <form class="login-form" onSubmit={handleSubmit}>

                <h3 class="fw-normal mb-3 pb-3" >Sign into your account</h3>

                <div data-mdb-input-init class="form-outline mb-4">
                <input type="email" id="login-form-email" class="form-control form-control-lg" placeholder="Enter email"/>
                {errors.email && (<span className="error">{errors.email}</span>)}
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                <input type="password" id="login-form-pass" class="form-control form-control-lg" placeholder="Password"/>
                {errors.password && (<span className="error">{errors.password}</span>)}
                </div>

                <div class="pt-1 mb-4">
                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-info btn-lg btn-block" type="submit">Login</button>
                </div>

                <p class="small mb-5 pb-lg-2"><a class="forgot" href="#!">Forgot password?</a></p>
                <p class="message-account">Don't have an account? <a href="/signup" class="link-info">Register here</a></p>

            </form>
            </div>
            </div>
            </div>
        </div>
    );
}