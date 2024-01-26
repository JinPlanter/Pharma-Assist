
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const webPages = ["ClassStudentPage", "ImportFile", "grading"];
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar justify-start">
      <div className="flex flex-col">
        <div className="flex flex-row mb-4">
            <button onClick={toggleNav} className="lg:hidden">
                <span className="text-2xl">&#9776;</span>
            </button>
            <div className="ml-auto">
                <Link href="/Login" className="mb-2" onClick={toggleNav}>
                    Login
                </Link>
            </div>
        </div>
        <ul className={`lg:flex flex-col ${isNavOpen ? 'flex' : 'hidden'}`}>
          {webPages.map((page) => (
            <li key={page} className="mb-2">
              <Link href={`/${page}`} onClick={toggleNav}>
                {page}
              </Link>
            </li>
          ))}
        </ul>
        
      </div>
    </nav>
  );
}
