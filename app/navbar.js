import React from 'react';
import Link from 'next/link';
import './Styles/style.css';

export default function Navbar() {
  const webPages = ["Login", "ClassStudentPage", "ImportFile", "grading", "mongotest"];

  return (
    <nav className="navbar">
      <ul className="flex items-center justify-between space-x-4">
        {webPages.map((page) => (
          <li key={page} className="hover:text-green-400 hover:underline">
            <Link href={`/${page}`}>{page}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}