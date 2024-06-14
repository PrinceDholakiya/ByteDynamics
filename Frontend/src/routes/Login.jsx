import logoImage from '../assets/Logo.jpeg';
import { Link } from "react-router-dom";

export default function Login(){
    return (
        
            <div class="container-fluid">
                <div class="row">
                <div class="col-sm-5 px-0 d-none d-sm-block">
                    <img src={logoImage} alt="Login image" />
                </div>
                <div class="col-sm-5 text-black">
                <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form class="login-form">

                    <h3 class="fw-normal mb-3 pb-3" >Sign into your account</h3>

                    <div data-mdb-input-init class="form-outline mb-4">
                    <input type="email" id="login-form-email" class="form-control form-control-lg" placeholder="Enter email"/>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="login-form-pass" class="form-control form-control-lg" placeholder="Password"/>
                    </div>

                    <div class="pt-1 mb-4">
                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-info btn-lg btn-block" type="button">Login</button>
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