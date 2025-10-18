import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import adminLogo from '../assets/admin_logo.svg'; // ✅ Make sure path is correct
import {useNavigate} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
const navigate = useNavigate()


  const logout = ()=>{
      navigate('/')
      aToken && setAToken('')
      aToken && localStorage.removeItem('aToken')
  }

  const handleLogout = () => {
    localStorage.removeItem('aToken');
    setAToken('');
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* Left Section */}
      <div className="flex items-center gap-3 text-xs">
        <img 
          src={adminLogo} 
          alt="Admin Logo" 
          className="w-36 sm:w-40 cuesor-pointer" // ✅ Bigger logo and proper aspect ratio
        />
        <p className="border px-2.5 py-o.5 rounded-full border-gray-500">
          {aToken ? 'Admin Dashboard' : 'Doctor Portal'}
        </p>
      </div>

      {/* Right Section */}
      <button
        onClick={handleLogout}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-transform hover:scale-[1.03]"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
