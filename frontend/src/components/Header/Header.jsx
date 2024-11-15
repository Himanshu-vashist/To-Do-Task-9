import React, { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';
import "./header.css";

function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);

    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }

    return (
        <div>
            <nav className="header bg-blue-600 text-white px-6 py-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                        <img src="https://imgs.search.brave.com/ftVRb0so-w0cnScmr-zesDvpARcGe5IsOxaWXMtg-Ns/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by8zZC1ub3Rlcy13/aXRoLWNoZWNrLW1h/cmstY29tcGxldGVk/LXRhc2stbGlzdC1j/aGVja2xpc3QtcGFw/ZXItZG9jdW1lbnQt/cmVwb3J0LXdpdGgt/cGVuY2lsXzEyNzEw/NjUtMTI4Ny5qcGc_/c2VtdD1haXNfaHli/cmlk" alt="Logo" className="w-10 h-10 rounded-full" />
                        <NavLink to="/" className="text-2xl font-bold hover:text-blue-300">Todo App</NavLink>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        {token ? (
                            <div className="flex items-center space-x-6">
                                {/* Welcome Message */}
                                <p className="text-lg">
                                    Welcome, <span className="font-semibold text-yellow-200">{user?.name || 'User'}</span>
                                </p>
                                {/* Logout Button */}
                                <button
                                    onClick={logout}
                                    className="bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-400 transition duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <ul className="flex items-center space-x-6">
                                <li>
                                    <NavLink
                                        to="/login"
                                        className="text-lg hover:text-yellow-400 transition duration-200"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/register"
                                        className="text-lg hover:text-yellow-400 transition duration-200"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;
