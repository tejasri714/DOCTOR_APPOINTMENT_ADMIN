import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        All Doctors
      </h1>

      {doctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              {/* Doctor Image */}
              <div className="w-full h-44 overflow-hidden rounded-xl mb-4">
                <img
                  src={
                    item.image
                      ? item.image
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Doctor Info */}
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{item.speciality}</p>

              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                  className="accent-blue-500 w-4 h-4"
                />
                <p className="text-sm text-gray-700">
                  {item.available ? "Available" : "Unavailable"}
                </p>
              </div>

              <p className="text-sm text-gray-700">🎓 Degree: {item.degree}</p>
              <p className="text-sm text-gray-700">🧑‍⚕️ Experience: {item.experience}</p>

              <p className="text-sm font-semibold text-gray-800 mt-3">
                💰 Fees: ₹{item.fees}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
