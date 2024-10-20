import { useState } from "react";
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
      <div className="md:hidden">
        {/* hamb*/}
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

      {}
      <nav
        className={`${
          isOpen ? "block md:hidden" : "hidden"
        } md:block absolute md:relative top-16 left-0 w-full md:w-auto bg-slate-50 md:bg-transparent z-50 md:z-auto p-4 md:p-0`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-8">
          <li>
            <a href="#" className="block py-2 md:py-0">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 md:py-0">
              About
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 md:py-0">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 md:py-0">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
