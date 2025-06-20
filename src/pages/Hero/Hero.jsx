import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaFireAlt, FaCalendarAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { LuMessageCircleMore } from "react-icons/lu";
import { FiAward } from "react-icons/fi";
import logo from '../../assets/Logo.png';
import Loading from '../../components/Loading/Loading';

const Hero = () => {
    const [events, setEvents] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://powerplay-server-beta.vercel.app/events')
            .then(res => res.json())
            .then(data => {
                // Sort by date (ascending)
                const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setEvents(sorted);
                setLoading(false);
            })
            .catch(err => {
        console.error('Failed to fetch events:', err);
        setLoading(false);
      });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % Math.min(3, events.length));
        }, 5000);
        return () => clearInterval(interval);
    }, [events]);

    if (loading) {
    return (
      <Loading></Loading>
    );
  }

    const sliderEvents = events.slice(0, 3);
    const featuredEvents = events.slice(0, 6);

    return (
        <div>
            {/* Hero Title */}
            <div className="text-center px-4 sm:px-6 mt-4 md:mt-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <img src={logo} alt="PowerPlay Logo" className="h-28 sm:h-44 md:h-56 animate-fade-in" />
                    <h1 className="font-extrabold inter yText text-5xl sm:text-6xl md:text-8xl lg:text-9xl animate-pulse">
                        PowerPlay
                    </h1>
                </div>
                <p className="lato text-xl sm:text-2xl md:text-3xl font-semibold mt-4 text-white">
                    Unleash the Action. Own the Arena.
                </p>
            </div>

            {/* Event Slider */}
            <div className="text-white">
                <div className="relative w-full h-[220px] sm:h-[280px] md:h-[380px] lg:h-[480px] xl:h-[550px] overflow-hidden rounded-xl shadow-lg mt-10">
                    {sliderEvents.map((event, index) => (
                        <img
                            key={event._id}
                            src={event.image}
                            alt={event.name}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                                index === currentSlide ? 'opacity-50 z-10' : 'opacity-0 z-0'
                            }`}
                        />
                    ))}

                    {sliderEvents.length > 0 && (
                        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight yText animate-fade-in inter">
                                Discover and Join the Best Upcoming Sports Events Near You
                            </h1>
                            <div className="mt-6 bg-gray-800 bg-opacity-70 px-6 py-4 rounded-md">
                                <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 animate-fade-in inter">
                                    {sliderEvents[currentSlide]?.name}
                                </h3>
                                <p className="text-sm text-gray-300 animate-fade-in lato">
                                    {new Date(sliderEvents[currentSlide]?.date).toDateString()}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Featured Events */}
                <section className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 sm:gap-0">
                        <h2 className="text-2xl sm:text-3xl font-bold yText flex items-center gap-2 inter">
                            <FaFireAlt className="text-yellow-400" /> Featured Events
                        </h2>
                        <Link
                            to="/book-events"
                            className="btn allBtn text-black px-4 py-2 rounded-md font-semibold text-sm sm:text-base lato"
                        >
                            See All Events
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {featuredEvents.map(event => (
                            <div
                                key={event._id}
                                className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-yellow-500/20 transition-all duration-300"
                            >
                                <img src={event.image} alt={event.name} className="w-full h-40 object-cover" />
                                <div className="p-4 space-y-2">
                                    <h3 className="text-lg sm:text-xl font-semibold text-white inter">{event.name}</h3>
                                    <p className="text-sm text-gray-400 flex items-center gap-1 lato">
                                        <FaCalendarAlt /> {new Date(event.date).toDateString()}
                                    </p>
                                    <p className="text-sm text-gray-400 flex items-center gap-1 lato">
                                        <MdCategory /> {event.type}
                                    </p>
                                    <Link
                                        to={`/event/${event._id}`}
                                        className="inline-block mt-4 text-black allBtn px-4 py-2 rounded font-medium transition text-sm sm:text-base lato"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white flex items-center justify-center gap-2 inter">
                        <LuMessageCircleMore className="text-yellow-400" /> What People Say
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lato">
                        {[
                            { quote: "Amazing event organization! Everything ran smoothly and we had a blast!", author: "— Alex" },
                            { quote: "The workshop helped me improve my game immensely. Highly recommend.", author: "— Jordan" },
                            { quote: "Loved the networking event! Got to meet many interesting people.", author: "— Taylor" },
                        ].map((t, i) => (
                            <blockquote key={i} className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow text-white">
                                <p className="text-gray-300 italic">“{t.quote}”</p>
                                <footer className="mt-4 text-yellow-400 text-sm font-semibold">{t.author}</footer>
                            </blockquote>
                        ))}
                    </div>
                </section>

                {/* Popular Sports */}
                <section className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 yText flex items-center justify-center gap-2 inter">
                        <FiAward className="text-yellow-400" /> Popular Sports
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center lato">
                        {['Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming', 'Running'].map((sport, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-900 border border-gray-700 py-4 rounded-lg hover:bg-yellow-500 hover:text-black font-semibold transition-all text-sm sm:text-base"
                            >
                                {sport}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Hero;
