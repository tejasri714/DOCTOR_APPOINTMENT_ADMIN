import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className='min-h-screen w-64 bg-white border-r shadow-md'>
      {aToken && (
        <ul className='mt-8 flex flex-col gap-2 text-gray-700'>
          {/* Dashboard */}
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-5 rounded-lg transition-all duration-200
              hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? 'bg-blue-100 text-blue-700 font-semibold' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-6 h-6" />
            <p>Dashboard</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-5 rounded-lg transition-all duration-200
              hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? 'bg-blue-100 text-blue-700 font-semibold' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" className="w-6 h-6" />
            <p>Appointments</p>
          </NavLink>

          {/* Add Doctor */}
          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-5 rounded-lg transition-all duration-200
              hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? 'bg-blue-100 text-blue-700 font-semibold' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" className="w-6 h-6" />
            <p>Add Doctor</p>
          </NavLink>

          {/* Doctors List */}
          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-5 rounded-lg transition-all duration-200
              hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? 'bg-blue-100 text-blue-700 font-semibold' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctors List" className="w-6 h-6" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
