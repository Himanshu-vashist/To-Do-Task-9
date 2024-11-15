
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js";
import TokenContext from '../context/TokenContext.js';

function Register() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/register", formData);
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
            userDispatch({ type: "SET_USER", payload: result.data.user });
            localStorage.setItem("authToken", JSON.stringify(result.data.token));
        } catch (error) {
            console.log(error);
            setError({ message: error.response.data.message });
        }
    };

    return (
        <div className="mt-10 bg-gray-50 min-h-screen flex items-center justify-center">
            {userToken && <Navigate to="/" />}
            <div className="container mx-auto flex flex-wrap justify-center">
                {/* Image Section */}
                <div className="hidden lg:block lg:w-6/12 px-6">
                    <img
                        src="https://imgs.search.brave.com/Yn_FWPQVvzM4tvU685iDeAJrBjLvQEgR_eQESvVZr0o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by91c2VyZnJpZW5k/bHktcHJvamVjdC10/YXNrLWxpc3Qtd2l0/aC1kcmFnYW5kZHJv/cC1mdW5jdGlvbmFs/aXR5LWR1ZS1kYXRl/c18xMjM3NzQzLTcx/NDcyLmpwZz9zZW10/PWFpc19oeWJyaWQ"
                        alt="Register Illustration"
                        className="w-full"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-5/12 px-6">
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Register</h2>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                {error.message}
                            </div>
                        )}
                        <form method="post" onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    defaultChecked
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-800">
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
                            >
                                Register
                            </button>
                        </form>
                        <div className="text-center mt-6 text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-600 font-medium hover:underline">
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
