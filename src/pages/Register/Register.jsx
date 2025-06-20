import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, useLocation, Link } from 'react-router';
import { auth } from '../../firebase/firebase.config';
import BackgroundImage from '../../assets/Background.jpg';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        photoURL: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, photoURL, email, password } = formData;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, { displayName: name, photoURL });
            toast.success("Registration Successful");
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
                <form onSubmit={handleRegister} className="bg-white/10 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-2xl border border-gray-700 max-w-sm w-full text-white space-y-4">
                    <h1 className="text-4xl font-bold yText text-center mb-6">Register</h1>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Name</label>
                        <input name="name" onChange={handleChange} className="input input-bordered w-full bg-white text-black" placeholder="Enter your Name" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Profile URL</label>
                        <input name="photoURL" onChange={handleChange} className="input input-bordered w-full bg-white text-black" placeholder="Profile Image URL" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Email</label>
                        <input name="email" type="email" onChange={handleChange} className="input input-bordered w-full bg-white text-black" placeholder="Email" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Password</label>
                        <input name="password" type="password" onChange={handleChange} className="input input-bordered w-full bg-white text-black" placeholder="Password" required />
                    </div>
                    <button type="submit" className="btn btn-neutral navBtns w-full mt-2">Register</button>
                </form>

                <Link to={"/login"} className='lato mt-4'>Already have an Account? <span className='yText underline font-bold'>Login!</span> </Link>
            </div>
        </div>
    );
};

export default Register;
