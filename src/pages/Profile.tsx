import * as React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import algo_logo from "./../assets/images/algorithmia_logo.png";

const Dashboard: React.FC = () => {
    const handleScanPoinClick = () => {
        window.open("https://gallery-digital-algorithmia.vercel.app/", "_blank");
      };
  return (
    <div
      className="h-screen flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(180deg, #ffffff, #add8e6, #d8bfd8)" }}
    >
      {/* Navbar */}
      <div className="w-full fixed top-0 z-10">
        <Navbar />
      </div>

      {/* User Profile Section */}
      <div className="mt-16 bg-white bg-opacity-90 shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105">
        <img 
          src={algo_logo} 
          alt="Profile" 
          className="h-24 w-24 mb-4 rounded-full border-4 border-transparent hover:border-indigo-300 transition-all duration-300"
          style={{ filter: 'brightness(90%)' }} // Menambahkan efek brightness untuk memudarkan gambar
        />
        <h2 className="text-2xl font-bold text-indigo-600">Username</h2>
        <p className="text-gray-500">Nama Lengkap</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center mt-6 space-y-4">
        <Button variant="default" size="lg" className="transition-transform transform hover:scale-105" onClick={handleScanPoinClick}>Scan Poin</Button>
        <Button variant="secondary" size="lg" className="transition-transform transform hover:scale-105">Gallery Digital</Button>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-xs text-center text-gray-600">
        <a
          href="https://www.instagram.com/algorithmia.fest/"
          className="text-pink-500 hover:underline transition-colors duration-300"
        >
          Instagram: @Algorithmia.fest
        </a>
        <span className="mx-2">|</span>
        <a
          href="mailto:algorithmiafest@gmail.com"
          className="text-blue-500 hover:underline transition-colors duration-300"
        >
          Email: algorithmiafest@gmail.com
        </a>
      </footer>
    </div>
  );
};

export default Dashboard;
