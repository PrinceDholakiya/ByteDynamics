import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

export default function SignUp(){

    const[firstName, setFirstName] = useState();
    const[lastName, setLastName] = useState();
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const[repeatPassword, setRepeatPassword] = useState();
    const[phoneNumber, setPhoneNumber] = useState();
    const[address, setAddress] = useState();
    const[gender, setGender] = useState();
    const[dateOfBirth, setDateOfBirth] = useState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const isAdmin = new Boolean(true);
    const auth = useAuth();

    if(auth.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Validation logic
        let errors = {};
        if (!firstName) {
          errors.firstName = "First name is required";
        }
        if (!lastName) {
          errors.lastName = "Last name is required";
        }
        if (!email) {
          errors.email = "Email is required";
        }
        if (!password) {
            errors.password = "Password is required";
        }
        if (password !== repeatPassword) {
            errors.repeatPassword = "Password doesn't match";
        }
        if (!phoneNumber) {
            errors.phoneNumber = "Phone Number is required";
        }
        if (!address) {
            errors.address = "Address is required";
        }
        if (!gender) {
            errors.gender = "Gender is required";
        }
        if (!dateOfBirth) {
            errors.dateOfBirth = "Date of Birth is required";
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
            "http://localhost:4000/api/v1/registration/send",
            {
            email,
            firstName,
            lastName,
            password,
            phoneNumber,
            address,
            gender,
            dateOfBirth,
            isAdmin
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
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setPhoneNumber("");
        setAddress("");
        setGender("");
        setDateOfBirth("");

        // Redirect to login page
        navigate("/");
        } catch (error) {
        toast.error(error.response.data.message);
        }
    }   

    return (
        <div className="mainRegister">
        <div className="register">
        <form className="registerForm" onSubmit={handleSubmit}>

            <h3 className="fw-normal mb-3 pb-3 textCenter" >Register Form</h3>

            <div data-mdb-input-init className="form-outline mb-2">
            <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} id="registerFormName" className="form-control form-control-lg" placeholder="First Name"/>
            {errors.firstName && (<span className="error">{errors.firstName}</span>)}
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
            <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} id="registerFormLastName" className="form-control form-control-lg" placeholder="Last Name"/>
            {errors.lastName && (<span className="error">{errors.lastName}</span>)}
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="registerFormEmail" className="form-control form-control-lg" placeholder="Email"/>
            {errors.email && (<span className="error">{errors.email}</span>)}
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="registerFormPass" className="form-control form-control-lg" placeholder="Password"/>
            {errors.password && (<span className="error">{errors.password}</span>)}
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
            <input type="password" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} id="registerFormPass2" className="form-control form-control-lg" placeholder="Repeat Password"/>
            {errors.repeatPassword && (<span className="error">{errors.repeatPassword}</span>)}
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
            <input type="text" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} id="registerFormPhone" className="form-control form-control-lg" placeholder="Phone Number"/>
            {errors.phoneNumber && (<span className="error">{errors.phoneNumber}</span>)}
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} id="registerFormAddress" className="form-control form-control-lg" placeholder="Address"/>
            {errors.address && (<span className="error">{errors.address}</span>)}
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
                <select className="form-control" defaultValue={'default'} value={gender} onChange={(e)=>setGender(e.target.value)} id="registerFormGender">
                    <option value="default" disabled>Select Gender</option>
                    <option key="Male" value="Male">Male</option>
                    <option key="Female" value="Female">Female</option>
                    <option key="declineToState" value="declineToState">Decline to state</option>
                </select>
            {errors.gender && (<span className="error">{errors.gender}</span>)}    
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
            <input type="text" value={dateOfBirth} onChange={(e)=>setDateOfBirth(e.target.value)} id="registerFormDOB" className="form-control form-control-lg" placeholder="Date of Birth"/>
            {errors.dateOfBirth && (<span className="error">{errors.dateOfBirth}</span>)}
            </div>

            <div className="pt-1 mb-4">
            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="submit">Register</button>
            </div>

        </form>
        </div>
        </div>
    );
}