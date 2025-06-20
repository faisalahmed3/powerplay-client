import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router';
import BackgroundImage from '../../assets/Background.jpg';

const Home = () => {
    return (
        <div className="relative min-h-screen w-full">
            <div
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    filter: 'brightness(0.2)',
                }}
            ></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
