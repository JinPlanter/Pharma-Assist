"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [privileges, setPrivileges] = useState("TEACHER"); // Default privilege

    const handleCheck = async () => {
        try {
            // Sign in using email and password
            await signIn("login", { email, password });
            // You can add any additional logic here if needed
        } catch (error) {
            console.error("Sign in failed", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sign up with email, password, and privileges
            await signIn("signup", { email, password, privileges, callbackUrl: "/" });
        } catch (error) {
            console.error("Sign up failed", error);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Privileges:</label>
                    <select
                        value={privileges}
                        onChange={(e) => setPrivileges(e.target.value)}
                        required
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="TEACHER">TEACHER</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {/* Button to sign in using email/password */}
            <button onClick={handleCheck}>Sign In</button>
        </div>
    );
}
