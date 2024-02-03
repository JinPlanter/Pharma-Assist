"use client";

// Import necessary modules from the React library
import React, { useState } from 'react';
//import '../Styles/style.css'; // Import styles

// LoginPage component
export default function LoginPage() {
    // State variables for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Event handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Log the entered username and password to the console
        console.log(`Username: ${username}, Password: ${password}`);

        // Create a Blob containing the user input as JSON
        const blob = new Blob([JSON.stringify({ username, password }, null, 2)], { type: 'application/json' });

        // Create a download link and trigger a click to download the JSON file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'user-input.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clear the username and password fields after submission
        setUsername('');
        setPassword('');
    };

    // JSX rendering for the LoginPage component
    return (
        <div>
            {/* Main content area with a login form */}
            <main>
                <form onSubmit={handleSubmit} className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mt-10 w-1/2 mx-auto">
                    {/* Username input field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    
                    {/* Password input field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    {/* Sign In button */}
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
