import React from 'react';
import BackgroundImage from '../../assets/Background.jpg';
import ErrorImage from '../../assets/Error.png';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className="w-screen h-screen relative">
            {/* Background */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.2)',
                }}
            ></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="flex flex-col items-center justify-center max-w-full">
                    <img 
                        src={ErrorImage} 
                        alt="Error" 
                        className="w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[30rem]"
                    />
                    <Link
                        to="/"
                        className="
                            btn allBtn font-bold text-base sm:text-lg md:text-xl lg:text-2xl py-3 px-4 sm:py-5 sm:px-6 md:py-6 md:px-8 lg:py-7 lg:px-10 text-black rounded-full mt-8max-w-full text-center transition duration-300">
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Error;
