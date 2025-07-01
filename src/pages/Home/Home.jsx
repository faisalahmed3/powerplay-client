import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router';
import BackgroundImage from '../../assets/Background.jpg';

const Home = () => {
    return (
        <div className="relative min-h-screen w-full">
            {/* Background Layer */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    filter: 'brightness(0.2)',
                }}
            ></div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Fixed Navbar */}
                <div className="fixed top-0 left-0 w-full z-20">
                    <Navbar />
                </div>

                {/* Spacer to avoid content going under the navbar */}
                <div className="h-[80px]"></div> {/* Adjust based on Navbar height */}

                {/* Main content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Home;
