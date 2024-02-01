"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// import './Styles/style.css';

export default function Navbar() {
    const webPages = ["Login", "ImportFile", "Grading", "DisplayClassList", "Import_Test"];
    const pathname = usePathname();

    return (
        <nav className="navbar">
            <ul className="flex items-center justify-between space-x-4">
                {webPages.map((page) => (
                    <li key={page} className={`block py-2.5 px-4 rounded transition duration-200 link ${pathname === `/Tabs/${page}` ? 'text-green-400 bg-slate-200' : 'hover:text-green-400 hover:underline'}`}>
                        <Link href={`/Tabs/${page}`}>{page}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}