import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import MenuLoginLayout from "../layout/MenuLayout";
import logoImage from '../assets/Logo.jpeg';

export default function SignUp() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email_id, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const pages = [{ title: "Home", path: "/" }, { title: "Login", path: "/" },];

  const validatePassword = (input) => 
  { 
    let error = "";
    if (input.length < 8) { 
      error = "Password should be at least 8 characters long";
    } 
    else if (!/\d/.test(input)) { 
      error = "Add at least one number";
    } 

    else if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) { 
      error = "Include both upper and lower case letters";
    } 

    else if (!/[^A-Za-z0-9]/.test(input)) { 
      error = "Include at least one special character";
    } 

    return error;
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
    if (!email_id) {
      errors.email_id = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    else
    {
      if(validatePassword(password)!=null && validatePassword(password).length>0)
      {
        errors.password = validatePassword(password);
      }  
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

    const dateBirth = dateOfBirth.split("/");
    const DOB = new Date(dateBirth[2], dateBirth[1], dateBirth[0]);
    console.log(DOB);

    // If no errors, proceed with form submission
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/registration/send",
        {
          email_id,
          firstName,
          lastName,
          password,
          phoneNumber,
          address,
          gender,
          DOB,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      alert(data.message);

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
      alert(error.response.data.message);
    }
  };

  return (
    <MenuLoginLayout pages={pages}>
        
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-5 px-0 d-none d-sm-block">
                <img src={logoImage} alt="Login image" />
            </div>
            
            <div className="col-sm-5 text-black d-flex align-items-center h-custom-3 px-5 ms-xl-4 mt-8 pt-5 pt-xl-0 mt-xl-n5">
            <form id="myForm" onSubmit={handleSubmit}>

              <h3 className="fw-normal mb-3 pb-3 textCenter" >Register form</h3>

              <div className="form-row">
                <div className="form-group">
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  id="registerFormName" className="form-control" placeholder="First Name"/>
                  {errors.firstName && (<span className="error">{errors.firstName}</span>)}
                </div>
                <div className="form-group">
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                  id="registerFormLastName" className="form-control" placeholder="Last Name"/>
                  {errors.lastName && (<span className="error">{errors.lastName}</span>)}
                </div>
              </div>

              <div className="form-row">
                  <input type="email" value={email_id} onChange={(e) => setEmail(e.target.value)}
                  id="registerFormEmail" className="form-control" placeholder="Email"/>
                  {errors.email_id && (<span className="error">{errors.email_id}</span>)}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  id="registerFormPass" className="form-control" placeholder="Password"/>
                  {errors.password && (<span className="error">{errors.password}</span>)}
                </div>
                <div className="form-group">
                  <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}
                  id="registerFormPass2" className="form-control" placeholder="Confirm Password"/>
                  {errors.repeatPassword && (<span className="error">{errors.repeatPassword}</span>)}
                </div>
              </div>

              <div className="form-row">
                  <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                  id="registerFormPhone" className="form-control" placeholder="Phone Number"/>
                  {errors.phoneNumber && (<span className="error">{errors.phoneNumber}</span>)}
              </div>

              <div className="form-row">
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                  id="registerFormAddress" className="form-control" placeholder="Address"/>
                  {errors.address && (<span className="error">{errors.address}</span>)}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <select className="form-control" defaultValue={"default"}
                  value={gender} onChange={(e) => setGender(e.target.value)} id="registerFormGender">
                  <option value="default" disabled>Select Gender</option>
                  <option key="Male" value="Male">Male</option>
                  <option key="Female" value="Female">Female</option>
                  <option key="declineToState" value="declineToState">Decline to state</option>
                  </select>
                  {errors.gender && <span className="error">{errors.gender}</span>}
                </div>
                <div className="form-group">
                  <input type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}
                  id="registerFormDOB" className="form-control" placeholder="Date of Birth"/>
                  {errors.dateOfBirth && (<span className="error">{errors.dateOfBirth}</span>)}
                </div>
              </div>

              
              <div className="pt-1 mb-4">
                <button data-mdb-button-init data-mdb-ripple-init
                  className="btn btn-dark btn-lg btn-block" type="submit">
                  Register
                </button>
              </div>
            </form>
            </div>
          </div>
      </div>


    </MenuLoginLayout>
  );
}
