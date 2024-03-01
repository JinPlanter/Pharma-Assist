"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useWindowSize from "../lib/useWindowSize";

export default function Navigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const size = useWindowSize();
  const mobileMaxScreenSize = 700;
  {
    /* Close Drawer when user clicks outside of it */
  }
  useEffect(() => {
    if (size.width > mobileMaxScreenSize) {
      return setIsDrawerOpen(true);
    }
    if (isDrawerOpen) {
      document.addEventListener("click", closeDrawer);
    }
    return () => {
      document.removeEventListener("click", closeDrawer);
    };
  }, [isDrawerOpen, size]);
  return (
    <>
      {size.width < mobileMaxScreenSize ? (
        <div className="menuButtonWrapper">
          <button className="menuButton" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      ) : null}
      {isDrawerOpen && (
        <nav className="navigation ">
          <div className="navigationDrawer">
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
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
