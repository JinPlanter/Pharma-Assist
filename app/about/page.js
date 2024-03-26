import React from "react";
import Link from "next/link";

export default function About() {
    return (
        <>
            <div className="container mx-auto my-8">
                <h1 className="text-3xl font-bold mb-4 text-accent">
                    Learn More About Pharma Assist
                </h1>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-2 text-secondary text-decoration-line: underline">
                        Our Vision
                    </h2>
                    <p>
                        Discover our commitment to revolutionizing the grading process for
                        the Pharmacy Assistant Program at the Southern Alberta Institute of
                        Technology. We aim to create a seamless digital platform where every
                        grade contributes to the academic success of students.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-2 text-secondary text-decoration-line: underline">
                        How It Works
                    </h2>
                    <p>
                        Explore the effortless grading process and understand how Pharma
                        Assist transforms manual grading into a digital, efficient, and
                        secure system. Your contributions will help streamline grading for
                        instructors and provide instant feedback to students.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-2 text-secondary text-decoration-line: underline">
                        Impact Stories
                    </h2>
                    <p>
                        Read inspiring stories of how Pharma Assist has enhanced the grading
                        experience, saving time and improving accuracy for instructors while
                        empowering students to track their progress more effectively.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-2 text-secondary text-decoration-line: underline">
                        Get Involved
                    </h2>
                    <p>
                        Find out how you can become an integral part of Pharma Assist,
                        whether through feedback, suggestions for improvement, or spreading
                        the word to other educational institutions looking to modernize
                        their grading systems.
                    </p>
                </section>

                <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
                    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                            2024{" "}
                            <a href="" className="hover:underline">
                                Pharma Assist
                            </a>
                            . All Rights Reserved.
                        </span>
                    </div>
                </footer>

                <Link href="./dashboard" className="text-blue-500 hover:underline">
                    Back
                </Link>
            </div>
        </>
    );
}
