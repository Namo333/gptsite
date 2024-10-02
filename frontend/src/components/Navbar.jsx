import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

  return (
    <nav class="bg-[#0E1116] border-1">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ChatGPT</span>
            </Link>
        </div>
        <Outlet/>
    </nav>
  )
}

export default Navbar
