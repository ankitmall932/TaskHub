import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist( {
  variable: "--font-geist-sans",
  subsets: [ "latin" ],
} );

const geistMono = Geist_Mono( {
  variable: "--font-geist-mono",
  subsets: [ "latin" ],
} );

export const metadata: Metadata = {
  title: "TaskHub",
  description: "This is page where you can store your task for free.",
};

export default function RootLayout ( { children }: LayoutProps<"/"> )
{
  return (
    <html
      lang="en"
      className={ `${ geistSans.variable } ${ geistMono.variable } h-full antialiased` }
    >
      <body className="min-h-screen flex flex-col">
        <div className=" fixed top-4  sm:px-10 px-2 w-full">
          <Navbar />
        </div>
        <div className=" sm:px-10 px-2 pt-25 h-full w-full pb-10 flex-1">
          { children }
        </div>
        <div className="pb-5  sm:px-10 px-2 w-full">
          <Footer />
        </div>
      </body>
    </html>
  );
}
