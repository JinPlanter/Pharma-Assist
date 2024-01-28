
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';



export default function Navigation(){

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    {/* Close Drawer when user clicks outside of it */}
    useEffect(() => {
        if(isDrawerOpen){
            document.addEventListener('click', closeDrawer);
        }
        return () => {
            document.removeEventListener('click', closeDrawer);
        };
    },[isDrawerOpen]);


    return(
        <nav className="bg-custom-green p-4">
            <div className="flex items-center justify-between">
                {/* Hamburger Button for Small Screens */}
                <button
                    className="lg:hidden"
                    onClick={toggleDrawer}
                >
                    <span className="text-2xl">&#9776;</span>
                </button>

                {/* Logo */}
                <div className="text-white">
                    Pharma Assist
                </div>

                {/* Drawer for Small Screens */}
                {isDrawerOpen && (
                    <div className="lg:hidden fixed top-0 left-0 h-full bg-custom-green w-64 z-50 shadow">
                        <ul className="p-5 space-y-5">
                            <li>
                                <Link href="/" onClick={toggleDrawer}>Home</Link>
                            </li>
                            <li>
                                <Link href="/ClassStudentPage" onClick={toggleDrawer}>Class Student Page</Link>
                            </li>
                            <li>
                                <Link href="/ImportFile" onClick={toggleDrawer}>Import File</Link>
                            </li>
                            <li>
                                <Link href="/grading" onClick={toggleDrawer}>Grading</Link>
                            </li>
                            <li>
                                <Link href="/Login" onClick={toggleDrawer}>Login</Link>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Horizontal Navigation for Large Screens */}
                <div className="hidden lg:flex space-x-4">
                    <Link href="/">Home</Link>
                    <Link href="/ClassStudentPage">Class Student Page</Link>
                    <Link href="/ImportFile">Import File</Link>
                    <Link href="/grading">Grading</Link>
                    <Link href="/Login">Login</Link>
                </div>

                
            
            </div>
        </nav>
    )
}