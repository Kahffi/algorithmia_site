import { useContext, useState } from "react";
import { Link } from "react-router-dom"; // Menggunakan Link dari react-router-dom
import algo_logo from "../../assets/images/algorithmia_logo.png";
import { UserContext } from "@/context/UserContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useContext(UserContext)!;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className=" p-2 flex justify-between items-center shadow-md">
      <div>
        <img src={algo_logo} alt="algorithmia's logo" className="w-10" />
      </div>

      {/* Hamburger menu button untuk tampilan mobile */}
      <div className="md:hidden">
        <button className="text-black focus:outline-none" onClick={toggleMenu}>
          <svg
            className="w-5 h-5"
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

      {/* ${
          isOpen ? "block" : "hidden opacity-0"
        } */}

      {/* Navigasi */}
      <nav
        className={`  ${
          isOpen ? "block" : "hidden"
        } md:block absolute md:relative top-14 left-0 md:top-0 w-full md:w-auto bg-slate-50 md:bg-transparent z-50 md:z-auto p-4 md:p-0`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-8">
          {state ? (
            <>
              {/* <li onClick={closeMenu}>
                <Link to="/" className="block py-2 md:py-0">
                  Home
                </Link>
              </li> */}
              {/* <li onClick={closeMenu}>
                <Link to="/about" className="block py-2 md:py-0">
                  Profile
                </Link>
              </li> */}
              <li onClick={logout}>
                <Link to="/" className="block py-2 md:py-0 text-red-500">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li onClick={closeMenu}>
                <Link
                  to="/auth/signup"
                  className="block py-2 md:py-0 text-purple-700"
                >
                  Daftar
                </Link>{" "}
                {/* Link ke halaman Daftar */}
              </li>
              <li onClick={closeMenu}>
                <Link
                  to="/auth/signin"
                  className="block py-2 md:py-0 text-blue-500"
                >
                  Masuk
                </Link>{" "}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
