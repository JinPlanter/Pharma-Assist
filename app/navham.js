"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const webPages = ["Home", "ClassStudentPage", "ImportFile", "grading"];
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar justify-start">
      <div className="flex flex-col">
        <div className="flex flex-row mb-4 lg">
          <button onClick={toggleNav} className="lg:hidden">
            <span className="text-2xl">&#9776;</span>
          </button>
          <div className="ml-auto">
            <Link href="/Login" className="mb-2" onClick={toggleNav}>
              Login
            </Link>
          </div>
        </div>

        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 transition-opacity ${
            isNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={toggleNav}
        ></div>

        <div
          className={`fixed top-0 left-0 w-64 h-full bg-custom-black transform transition-transform ease-in-out ${
            isNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <ul className="p-4">
            {webPages.map((page) => (
              <li key={page} className="mb-2">
                <Link 
                href={page=== "Home" ? '/' : `/${page}`} 
                onClick={toggleNav}
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
