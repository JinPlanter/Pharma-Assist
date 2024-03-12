import { Inter } from "next/font/google";
import "./globals.css";
//import '../Styles/style.css';
import Navigation from "./components/navigation";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pharmacy Grading Tool",
  description:
    "Pharmacy Grading Tool for the Pharmacy Assistant Program at SAIT.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="{inter.className}">
        <div className="flex h-screen w-screen ">
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
