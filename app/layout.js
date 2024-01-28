import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/navigation'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pharmacy Grading Tool',
  description: 'Pharmacy Grading Tool for the Pharmacy Assistant Program at SAIT.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='m-5 {inter.className}'>
        <Navigation/>
        <div>{children}</div>
      </body>
    </html>
  )
}
