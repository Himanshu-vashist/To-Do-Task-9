
import React, { useState, useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js";

function CreateTask() {
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/task/addTask",
                { title, description },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

            dispatch({
                type: "ADD_TASK",
                title,
                description
            });

            setTitle("");
            setDescription("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-6 min-h-screen bg-gray-50 py-8 flex justify-center items-center">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg max-w-4xl w-full">
                {/* Image Section */}
                <div className="md:w-1/2 flex items-center justify-center p-4">
                    <img
                        src="https://imgs.search.brave.com/Yn_FWPQVvzM4tvU685iDeAJrBjLvQEgR_eQESvVZr0o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by91c2VyZnJpZW5k/bHktcHJvamVjdC10/YXNrLWxpc3Qtd2l0/aC1kcmFnYW5kZHJv/cC1mdW5jdGlvbmFs/aXR5LWR1ZS1kYXRl/c18xMjM3NzQzLTcx/NDcyLmpwZz9zZW10/PWFpc19oeWJyaWQ"
                        alt="Task Management"
                        className="rounded-lg shadow-md w-full h-auto"
                    />
                </div>

                {/* Form Section */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
                        Create New Task
                    </h2>

                    <form onSubmit={handleAdd} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Task Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter task title"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-900 text-sm placeholder:text-gray-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Task Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter task description"
                                required
                                rows={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-900 text-sm placeholder:text-gray-400 resize-none"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-colors duration-200 font-medium text-sm"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Create Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showToast && (
                <div className="fixed bottom-4 right-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Task created successfully!
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateTask;
