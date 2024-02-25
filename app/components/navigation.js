"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
                <button
                    className="lg:hidden"
                    onClick={toggleDrawer}
                >
                    <span className="text-2xl">&#9776;</span>
                </button>

                {/* Logo */}
                <div className="logo">
                    <img src="C:\Capstone\Pharma-Assist\app\logo\Pharma Assist Logo.jpeg" alt="Pharma Assist" />
                </div>

                {/* Drawer for Small Screens */}
                {isDrawerOpen && (
                    <div className="lg:hidden navigationDrawer">
                        <ul className="navigationDrawerUl">
                            <li className='navigationDrawerLi'>
                                <Link className='navigationDrawerLink' href="/" onClick={toggleDrawer}>Home</Link>
                            </li>
                            <li className='navigationDrawerLi'>
                                <Link className='navigationDrawerLink' href="/Login" onClick={toggleDrawer}>Login</Link>
                            </li>
                            <li className='navigationDrawerLi'>
                                <Link className='navigationDrawerLink' href="/ImportFile" onClick={toggleDrawer}>Import File</Link>
                            </li>
                            <li className='navigationDrawerLi'>
                                <Link className='navigationDrawerLink' href="/Students" onClick={toggleDrawer}>Students</Link>
                            </li>
                            <li className='navigationDrawerLi'>
                                <Link className='navigationDrawerLink' href="/Grading" onClick={toggleDrawer}>Grading</Link>
                            </li>
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
                </div>

            </div>
        </nav>
    )
}