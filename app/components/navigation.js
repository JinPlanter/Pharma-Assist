"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SignOutButton from './signoutbutton';

export default function Navigation() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    {/* Close Drawer when user clicks outside of it */ }
    useEffect(() => {
        if (isDrawerOpen) {
            document.addEventListener('click', closeDrawer);
        }
        return () => {
            document.removeEventListener('click', closeDrawer);
        };
    }, [isDrawerOpen]);


    return (
        <nav className="navigation">
            <div className="navigationContainer">
                {/* Hamburger Button for Small Screens */}
                <button className="lg:hidden" onClick={toggleDrawer}>
                    <span className="text-2xl">&#9776;</span>
                </button>

                {/* Logo */}
                <div className="logo">Pharma Assist</div>

                {/* Drawer for Small Screens */}
                {isDrawerOpen && (
                    <div className="lg:hidden navigationDrawer">
                        <ul className="navigationDrawerUl">
                            <li className="navigationDrawerLi">
                                <Link
                                    className="navigationDrawerLink"
                                    href="/"
                                    onClick={toggleDrawer}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="navigationDrawerLi">
                                <Link
                                    className="navigationDrawerLink"
                                    href="/Login"
                                    onClick={toggleDrawer}
                                >
                                    Login
                                </Link>
                            </li>
                            <li className="navigationDrawerLi">
                                <Link
                                    className="navigationDrawerLink"
                                    href="/ImportFile"
                                    onClick={toggleDrawer}
                                >
                                    Import File
                                </Link>
                            </li>
                            <li className="navigationDrawerLi">
                                <Link
                                    className="navigationDrawerLink"
                                    href="/Students"
                                    onClick={toggleDrawer}
                                >
                                    Students
                                </Link>
                            </li>
                            <li className="navigationDrawerLi">
                                <Link
                                    className="navigationDrawerLink"
                                    href="/Grading"
                                    onClick={toggleDrawer}
                                >
                                    Grading
                                </Link>
                            </li>
                            <li className="navigationDrawerLi">
                                <Link
                                    className="navigationDrawerLink"
                                    href="/signup"
                                    onClick={toggleDrawer}
                                >
                                    Next Auth Test
                                </Link>
                            </li>
                            <li className="navigationDrawerLi">
                                <Link
                                    className="navigationDrawerLink"
                                    href="/uploadclasslist"
                                    onClick={toggleDrawer}
                                >
                                    Database
                                </Link>
                            </li>
                            <li className="navigationDrawerLi">
                                <Link
                                    className="navigationDrawerLink"
                                    href="/GradingForm4"
                                    onClick={toggleDrawer}
                                >
                                    GradingForm4
                                </Link>
                            </li>
                            <SignOutButton />
                        </ul>
                    </div>
                )}

                {/* Horizontal Navigation for Large Screens */}
                <div className="hidden lg:flex space-x-4">
                    <Link href="/">Home</Link>
                    <Link href="/Login">Login</Link>
                    <Link href="/ImportFile">Import File</Link>
                    <Link href="/Students">Students</Link>
                    <Link href="/Grading">Grading</Link>
                    <Link href="/signup">Next Auth Test</Link>
                    <Link href="/uploadclasslist">Database Upload Test</Link>
                    <Link href="/GradingForm4">Grading Form 4</Link>
                    <SignOutButton />
                </div>
            </div>
        </nav>
    );
}