import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token); // ✅ store token in localStorage
          setAToken(data.token); // store token in context
          toast.success("Login successful!");
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        toast.info("Doctor login not implemented yet");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Login error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form
      className="min-h-screen flex items-center justify-center bg-gray-50"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4 m-auto items-start p-10 w-full max-w-md bg-white border border-gray-100 rounded-2xl text-gray-700 shadow-xl">
        {/* Title */}
        <p className="text-3xl font-semibold m-auto text-gray-900">
          <span className="text-blue-600">{state}</span> Login
        </p>

        {/* Email */}
        <div className="w-full">
          <p className="font-medium mb-1 text-gray-700">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded-lg w-full p-3 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p className="font-medium mb-1 text-gray-700">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded-lg w-full p-3 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg text-base font-medium shadow-md transition-transform hover:scale-[1.02]"
          type="submit"
        >
          Login
        </button>

        {/* Switch Login Type */}
        {state === "Admin" ? (
          <p className="text-sm text-gray-600">
            Doctor Login?{" "}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Admin Login?{" "}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
