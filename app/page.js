"use client";

import React, { useState } from "react";
import LoginPage from "./Login/page.js";

export default function Home() {
  const [showLoginPage, setShowLoginPage] = useState(false);

  const handleGetStartedClick = () => {
    setShowLoginPage(true);
  };

  return (
    <section class="bg-center bg-no-repeat bg-[url('https://sundancecollege.com/uploads/Blog/community-pharmacy-in-Calgary.jpg')] bg-gray-700 bg-blend-multiply">
      <div class="px-4 mx-auto max-w-screen-xl text-center py-10 lg:py-40">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Welcome to Pharma Assist
        </h1>
        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Welcome to Pharma Assist grading app, the cutting-edge web application
          designed to revolutionize grading procedures for the Pharmacy
          Assistant program at our college. Say goodbye to the hassle of
          pen-and-paper grading methods and embrace the efficiency and accuracy
          of digital grading. Pharma Assist grading app offers a user-friendly
          interface tailored to the specific needs of instructors and students
          within the Pharmacy Assistant program.
        </p>
        <button className="btn btn-primary" onClick={handleGetStartedClick}>
          Get Started
        </button>
        {showLoginPage && (
          <div>
            <LoginPage />
          </div>
        )}
      </div>
    </section>
  );
}
