"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link className="btn btn-primary" href="/dashboard">
        Dashboard
      </Link>
    </>
  );
}
