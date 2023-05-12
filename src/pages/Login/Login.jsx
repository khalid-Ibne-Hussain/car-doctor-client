import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg"
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from 'react-icons/fa';

const Login = () => {
    const { signIn, handleGoogleLogin, handleFacebookLogin } = useContext(AuthContext);

    const [user, setUser] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';


    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(password, email);


        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);


                console.log(user);
                navigate(from, { replace: true })



            })
            .catch(error => {
                console.log(error.message);
            })

    }

    const handleGoogle = () => {
        handleGoogleLogin()
            .then(result => {
                const googleUser = result.user;
                setUser(googleUser);
            })
    }

    const handleFacebook = () => {
        handleFacebookLogin()
            .then(result => {
                const fbUser = result.user;
                setUser(fbUser);
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            })
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="text" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <div className="flex flex-col items-center gap-2">
                            <h5 className="text-lg font-semibold">Or Login with</h5>
                            <div className="flex gap-3">
                                <button onClick={handleFacebook} className="btn btn-circle bg-white"><FaFacebookF className="text-blue-500 font-bold text-xl" /></button>
                                <button className="btn btn-circle bg-white"><FaLinkedinIn className="text-blue-500 font-bold text-xl" /></button>
                                <button onClick={handleGoogle} className="btn btn-circle bg-white"><FaGoogle className="text-blue-500 font-bold text-xl" /></button>
                            </div>
                        </div>
                        <div className="text-center">
                            <p>Do not have an account yet? <Link to="/signup" className="text-orange-500 font-bold">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;