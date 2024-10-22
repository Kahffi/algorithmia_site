import { useState } from "react";
import { Link } from "react-router-dom"; // Menggunakan Link dari react-router-dom
import algo_logo from "../../assets/images/algorithmia_logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-slate-50 p-4 flex justify-between items-center">
      <div>
        <img src={algo_logo} alt="algorithmia's logo" className="w-12" />
      </div>

      {/* Hamburger menu button untuk tampilan mobile */}
      <div className="md:hidden">
        <button className="text-black focus:outline-none" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Navigasi */}
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } md:block absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-slate-50 md:bg-transparent z-50 md:z-auto p-4 md:p-0`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-8">
          <li>
            <Link to="/" className="block py-2 md:py-0">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 md:py-0">
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/auth/signin"
              className="block py-2 md:py-0 text-purple-700"
            >
              Daftar
            </Link>{" "}
            {/* Link ke halaman Daftar */}
          </li>
          <li>
            <Link
              to="/auth/signin"
              className="block py-2 md:py-0 text-blue-500"
            >
              Masuk
            </Link>{" "}
            {/* Link ke halaman Sign In */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
