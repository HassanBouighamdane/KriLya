import logo from '../images/logo-nobg.png';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { MyContext } from '../providers/UserProvider';
import { Link,useLocation } from 'react-router-dom';
function Navbar(){
  const { data, setData } = useContext(MyContext);
  const navigate = useNavigate();
  const [ isUserLoggedIn, setUserLoggedIn]= useState(false)
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
      navigate('/login');
    }
    
  }, []);
  const location = useLocation();

  // Function to determine if the button should be displayed
  const shouldDisplayButton = () => {
      // Check if current route is login or signup
      return !['/login', '/','/signup'].includes(location.pathname);
  };


  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setUserLoggedIn(false);
    navigate('/login');
  };
    return (
        <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pt-1">

          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} alt="Logo" className="w-40 pt-2" />

          </Link>
          
          <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul className="flex flex-col align-middle font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white md:border-gray-700">
              <li>
                <Link to="" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active" >Home</Link>
              </li>
              <li>

                <Link to="/home" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active">Items</Link>

              </li>
              
              <li>
                <Link to="/post" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active">Services</Link>
              </li>
              <li>
                <Link to="/post" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active">Contact</Link>
              </li>
              <li>
                <Link to="/post" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active">About us</Link>
              </li>
              {isUserLoggedIn && 
              <li>
                <button onClick={handleLogout} className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active">Logout</button>
              </li>
              }

              {shouldDisplayButton() && (
                    <li>
                        <button type="button" className="w-50 flex items-center text-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-900 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                <g>
                                    <rect fill="none" height="24" width="24"></rect>
                                </g>
                                <g>
                                    <g>
                                        <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                                    </g>
                                </g>
                            </svg>
                            <span className="pl-2 mx-1">Rent Out An Item</span>
                        </button>
                    </li>
                )}
              
            </ul>
          </div>
        </div>
      </nav>
      
    );
}
export default Navbar