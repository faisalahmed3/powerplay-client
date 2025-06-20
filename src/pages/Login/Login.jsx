import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, useLocation, Link } from 'react-router';
import { auth, googleProvider } from '../../firebase/firebase.config';
import BackgroundImage from '../../assets/Background.jpg';
import toast from 'react-hot-toast';

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const handleChange = e => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login Successful");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success("Google Sign-In Successful");
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="relative w-full h-screen">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.3)',
                }}
            ></div>

            <div className="absolute lato inset-0 z-10 flex flex-col items-center justify-center px-4">
                <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-2xl border border-gray-700 max-w-sm w-full text-white space-y-4">
                    <h1 className="text-4xl font-bold yText mb-6 text-center">Login</h1>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Email</label>
                        <input name="email" type="email" onChange={handleChange} className="input input-bordered w-full bg-white text-black" placeholder="Email" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Password</label>
                        <input name="password" type="password" onChange={handleChange} className="input input-bordered w-full bg-white text-black" placeholder="Password" required />
                    </div>

                    <button type="submit" className="btn btn-neutral navBtns w-full mt-2">Login</button>

                    <div className="divider text-white">OR</div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="btn w-full bg-white text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
                    >
                        <svg aria-label="Google logo" width="18" height="18" viewBox="0 0 512 512">
                            <g>
                                <path fill="#fff" d="M0 0h512v512H0z" />
                                <path fill="#EA4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                                <path fill="#FBBC05" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                                <path fill="#34A853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                                <path fill="#4285F4" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                            </g>
                        </svg>
                        Login with Google
                    </button>
                </form>
                <Link to={"/register"} className='lato mt-4'>Don't have any Account? <span className='yText underline font-bold'>Resgister Now!</span> </Link>
            </div>

            
        </div>
    );
};

export default Login;
