import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import UserProvider from "../(context)/UserContext"
import "@uploadthing/react/styles.css";
import NextNProgress from "nextjs-progressbar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {/* <NextNProgress color="#21FA90"/> */}
          {children}
        </UserProvider>
        </body>
    </html>
  )
}
