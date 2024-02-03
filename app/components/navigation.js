
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
      

      {/* Hamburger Button for Small Screens */}
      <button className="hamburger-btn" onClick={toggleDrawer}>
        <span className="text-2xl">&#9776;</span>
      </button>

      {/* Drawer for Small Screens */}
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <ul className="drawerUl">
          <li className="drawerLi">
            <Link className="drawerLink" href="/" onClick={toggleDrawer}>
              Home
            </Link>
          </li>
          <li className="drawerLi">
            <Link className="drawerLink" href="/ClassStudentPage" onClick={toggleDrawer}>
              Class Student Page
            </Link>
          </li>
          <li className="drawerLi">
            <Link className="drawerLink" href="/ImportFile" onClick={toggleDrawer}>
              Import File
            </Link>
          </li>
          <li className="drawerLi">
            <Link className="drawerLink" href="/grading" onClick={toggleDrawer}>
              Grading
            </Link>
          </li>
          <li className="drawerLi">
            <Link className="drawerLink" href="/Login" onClick={toggleDrawer}>
              Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Horizontal Navigation for Large Screens */}
      <div className="horizontal-nav">
        <Link href="/">Home</Link>
        <Link href="/ClassStudentPage">Class Student Page</Link>
        <Link href="/ImportFile">Import File</Link>
        <Link href="/grading">Grading</Link>
        <Link href="/Login">Login</Link>
      </div>

      <div className="logo">Lab Assist</div>
    </nav>
  );
}
