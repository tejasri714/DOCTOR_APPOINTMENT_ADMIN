import { createContext, useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState("");
  const [doctors, setDoctors] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch all doctors
  const getAllDoctors = async () => {
    if (!aToken) {
      toast.error("Admin token is missing. Please login.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/admin/all-doctors`,
        {}, // empty body
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Toggle doctor availability
  const changeAvailability = async (docId) => {
    if (!aToken) {
      toast.error("Admin token is missing. Please login.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/admin/change-availability`,
        { docId },
        { headers: { Authorization: `Bearer ${aToken}` } } // ✅ Correct header
      );

      if (data.success) {
        toast.success(data.message);
        // Update local state without refetching all doctors
        setDoctors((prevDoctors) =>
          prevDoctors.map((doc) =>
            doc._id === docId ? { ...doc, available: !doc.available } : doc
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Sync token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("aToken");
    if (token) setAToken(token);
  }, []);

  // Persist token to localStorage whenever it changes
  useEffect(() => {
    if (aToken) localStorage.setItem("aToken", aToken);
    else localStorage.removeItem("aToken");
  }, [aToken]);

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
