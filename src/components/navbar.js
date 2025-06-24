import logout from '../logout';
import { useEffect, useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
      }, []);
    return (
        <>
            <nav class="bg-gray-100">
                <div class="max-w-6xl mx-auto px-4">
                    <div class="flex justify-between">

                    <div class="flex space-x-4">
                        <div>
                        <a href="#" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                            <MapPinIcon className="h-6 w-6 mr-2 text-blue-500" />
                            <span className="font-extrabold text-xl tracking-wide">Roadmap</span>
                        </a>
                        </div>
                    </div>

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

                    <div class="md:hidden flex items-center">
                        <button class="mobile-menu-button">
                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        </button>
                    </div>

                    </div>
                </div>

                <div class="mobile-menu hidden md:hidden">
                    <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Features</a>
                    <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Pricing</a>
                </div>
            </nav>       
        </>
    );
}