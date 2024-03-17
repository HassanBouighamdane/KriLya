import logo from '../assets/images/logo-nobg.png';
import React, { useState ,useEffect, useContext} from 'react';
import {useNavigate,Link,useLocation } from 'react-router-dom';
import { MyContext } from '../providers/UserProvider';
import { FaUser } from 'react-icons/fa';
function Navbar(){
  // const location = useLocation();
  // const isLoginPage = location.pathname === '/login';
  // const isSignupPage = location.pathname === '/signup';

 
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


  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setUserLoggedIn(false);
    setData(false);
    navigate('/login');
  };
  // if (isLoginPage || isSignupPage) {
  //   return null;
  // }
    return (
      <div>
        
        <nav className="bg-white border-gray-200 w-full fixed top-0 z-50 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pt-1">

          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} alt="Logo" className="w-40 pt-2" />

          </Link>
          
          <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul className="flex flex-col align-middle items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white md:border-gray-700">
              <li>
                <Link to="" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active" >Home</Link>
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
              {data ? (
                <div className='flex flex-center items-center '>
                <li className=''>
                <button onClick={handleLogout} className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 active">Logout</button>
              </li>
              <li className='px-5'>
                <Link to="/profile">
                  <FaUser />
                </Link>
                
              </li>
              </div>
              ) : (
                <Link to="/signup"><button
                  // onClick={}
                  
                  className="block text-white bg-blue-950  rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-950 dark:hover:bg-blue-700 "
                  type="button"
                >
                  Sign up
                </button></Link>
                
              )}
             
              
            </ul>
          </div>
        </div>
      </nav>
      <div id="navbar-placeholder" className="h-28"></div> 
    </div>
      
    );
}
export default Navbar
