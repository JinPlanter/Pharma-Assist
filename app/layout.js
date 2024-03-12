import { Inter } from "next/font/google";
import "./globals.css";
//import '../Styles/style.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pharmacy Grading Tool",
  description:
    "Pharmacy Grading Tool for the Pharmacy Assistant Program at SAIT.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`{inter.className} h-full`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
