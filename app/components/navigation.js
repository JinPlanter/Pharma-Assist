"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useWindowSize from "../lib/useWindowSize";

export default function Navigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pages = ["/", "/Login", "/ImportFile", "/Students", "/Grading"];
  const pageNames = ["Home", "Login", "Import File", "Students", "Grading"];

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
        <div
          className={
            `menuButtonWrapper ` + (isDrawerOpen == false ? `mr-12` : null)
          }
        >
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
              {pages.map((page, i) => {
                return (
                  <li className="navigationDrawerLi">
                    <Link
                      className="navigationDrawerLink"
                      href={page}
                      onClick={toggleDrawer}
                    >
                      {pageNames[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
