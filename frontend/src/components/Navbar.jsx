import logo from '../images/logo-nobg.png';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    

    return (
        <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pt-1">
          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} alt="Logo" className="w-40 pt-2" />
          </Link>
          
          <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white md:border-gray-700">
              <li>
                <Link to="" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active" >Home</Link>
              </li>
              <li>
                <Link to="/home" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active">Home</Link>
              </li>
              
              <li>
                <Link to="/post" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active">Services</Link>
              </li>
              <li>
                <Link to="/post" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active">Pricing</Link>
              </li>
              <li>
                <Link to="/post" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    );
}
export default Navbar