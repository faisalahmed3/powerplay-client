import React, { useContext } from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import logo from '../../assets/Logo.png';
import { AuthContext } from '../../context/AuthContext';

const Footer = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='border-t-2 border-gray-700'>
            <footer className="flex flex-col md:items-center gap-6 text-base-content p-6 md:p-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <img src={logo} alt="PowerPlay Logo" className="h-12 md:h-16" />
                        <h1 className="font-extrabold inter yText text-2xl md:text-3xl">PowerPlay</h1>
                    </div>
                    <p className='ss3 md:text-lg'>Unleash the Action. Own the Arena.</p>
                </div>

                <nav className="flex flex-col items-start md:flex-row md:items-center gap-4 md:gap-8 text-base md:text-xl font-semibold">
                    <Link className='btn btn-ghost navBtns' to={"/"}>Home</Link>
                    <Link className='btn btn-ghost navBtns' to={"/book-events"}>Book Events</Link>
                    {user && (
                        <>
                            <Link className='btn btn-ghost navBtns' to={"/my-booking"}>My Booking</Link>
                            <Link className='btn btn-ghost navBtns' to={"/manage-event"}>Manage Events</Link>
                        </>
                    )}
                </nav>

                <div className="flex gap-6 text-2xl">
                    <a href="https://www.facebook.com/faisal.ahmed.58115" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a href="https://www.instagram.com/_faisal_ahmed132/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a href="https://github.com/faisalahmed3" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/faisal-ahmed4417/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>

                <aside className="md:text-center mt-7">
                    <p>© {new Date().getFullYear()} - All rights reserved by PowerPlay</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;
