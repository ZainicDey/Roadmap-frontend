import logout from '../logout';
import { useEffect, useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex space-x-4">
                        <a href="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                            <MapPinIcon className="h-6 w-6 mr-2 text-blue-500" />
                            <span className="font-extrabold text-xl tracking-wide">Roadmap</span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {isLoggedIn ? (
                            <button
                                onClick={logout}
                                className="py-2 px-3 bg-red-500 hover:bg-red-400 text-white rounded transition duration-300"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <a href="/login" className="py-5 px-3">Login</a>
                                <a
                                    href="/register"
                                    className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
                                >
                                    Signup
                                </a>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="mobile-menu-button">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="mobile-menu md:hidden px-4 pb-4">
                    <div className="flex flex-col space-y-1">
                        <a href="/" className="py-2 px-0 text-sm text-gray-500 rounded hover:bg-gray-200 inline-block">
                        <span className="px-3">Refresh</span>
                        </a>
                        <a href="/logout" className="py-2 px-0 text-sm text-red-500 rounded hover:bg-gray-200 inline-block">
                        <span className="px-3">Logout</span>
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
