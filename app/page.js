"use client";

import React, { useState } from "react";
import LoginPage from "./Login/page.js";
import Link from "next/link.js";

export default function Home() {
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showGetStartedButton, setShowGetStartedButton] = useState(true);

  const handleGetStartedClick = () => {
    setShowLoginPage(true);
    setShowGetStartedButton(false);
  };

  return (
    <section className="min-h-full bg-center bg-no-repeat bg-[url('https://sundancecollege.com/uploads/Blog/community-pharmacy-in-Calgary.jpg')] bg-gray-700 bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-10 lg:py-40">
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
            <button className="btn btn-primary w-32" onClick={handleGetStartedClick}>
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
    </section>
  );
}
