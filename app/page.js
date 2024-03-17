"use client";

import React, { useState } from "react";
import LoginPage from "./Login/page.js";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showGetStartedButton, setShowGetStartedButton] = useState(true);

  const handleGetStartedClick = () => {
    setShowLoginPage(true);
    setShowGetStartedButton(false);
  };

  return (
    <section
      className={`min-h-full bg-center bg-no-repeat bg-[url('/pharmacy.jpg')] bg-gray-700 bg-blend-multiply`}
    >
      <div className="px-4 mx-auto max-w-screen-xl text-center py-10 lg:py-40">
        <Image className="mx-auto block" src="/logo.png" width={500} height={50} alt="Pharmassist logo" />
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Welcome to Pharma Assist
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Welcome to Pharma Assist grading app, the cutting-edge web application
          designed to revolutionize grading procedures for the Pharmacy
          Assistant program at our college. Say goodbye to the hassle of
          pen-and-paper grading methods and embrace the efficiency and accuracy
          of digital grading. Pharma Assist grading app offers a user-friendly
          interface tailored to the specific needs of instructors and students
          within the Pharmacy Assistant program.
        </p>
        <div className="flex flex-col items-center justify-center gap-2">
          {showGetStartedButton && (
            <button
              className="btn btn-primary w-32"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          )}
          {showLoginPage && (
            <div className="w-full">
              <LoginPage />
            </div>
          )}

          {/*THIS BUTTON IS TEMPORARY, WE SHOULD REDIRECT TO THE DASHBOARD UPON LOGIN */}
          <Link className="btn btn-primary w-32" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>

      <footer className=" w-full bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src="" className="h-8" alt="" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Pharma Assist
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="./about" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
             2024{" "}
            <a href="" className="hover:underline">
              Pharma Assist
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </section>
  );
}
