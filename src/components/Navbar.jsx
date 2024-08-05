import { Menu, X } from "lucide-react";
import { useState } from "react";
import imglogo from "../assets/imglogo.png"
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className=" sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={imglogo} alt="Logo" />
            <span className="text-3xl font-bold tracking-tight font-mono">C O D E R O O M</span>
          </div>
          {/* <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul> */}
          <div className="hidden lg:flex justify-center space-x-6 items-center">
            <Link to="/login" className="py-2 px-3 border rounded-md transition duration-300 ease-in-out hover:bg-[#f5f5f5] hover:text-black">
              Login
            </Link>
            <Link to="/register"
              className="py-2 px-3 rounded-md bg-gradient-to-r transition duration-300 ease-in-out text-black bg-white hover:bg-gray-200 hover:bg-gradient-to-r hover:from-pink-400 hover:via-purple-500 hover:to-violet-500  "
            >
              Create an account
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            {/* <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul> */}
            <div className="flex space-x-6">
              <Link to="/login" className="py-2 px-3 border rounded-md transition duration-300 ease-in-out hover:bg-[#f5f5f5] hover:text-black">
                Login
              </Link>
              <Link to="/register"
                className="py-2 px-3 rounded-md bg-gradient-to-r transition duration-300 ease-in-out text-black bg-white hover:bg-gray-200 hover:bg-gradient-to-r hover:from-pink-400 hover:via-purple-500 hover:to-violet-500"
              >
                Create an account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
