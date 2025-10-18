import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null); // optional image
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      // Append image only if it exists
      if (docImg) formData.append('image', docImg);

      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', fees);
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        `${backendUrl}/admin/add-doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`, // send token in standard header
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        // Clear form
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
        setSpeciality('General Physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full flex justify-center">
      <div className="bg-white px-10 py-8 border rounded-2xl shadow-md w-full max-w-4xl max-h-[85vh] overflow-y-auto">
        <p className="text-2xl font-semibold mb-8 text-blue-600">Add Doctor</p>

        {/* Upload Section */}
        <div className="flex items-center gap-5 mb-10 text-gray-600">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-20 h-20 object-cover bg-gray-100 rounded-full border-2 border-dashed border-blue-400 hover:border-blue-600 transition"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload doctor"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            className="hidden"
          />
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">
              Upload Doctor Picture (optional)
            </span>
            <br />
            PNG, JPG, or JPEG format only
          </p>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-700">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <p>Doctor Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter name"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <p>Doctor Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <p>Doctor Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter password"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-1">
            <p>Experience</p>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>

          {/* Fees */}
          <div className="flex flex-col gap-1">
            <p>Fees</p>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              type="number"
              placeholder="Enter consultation fees"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Speciality */}
          <div className="flex flex-col gap-1">
            <p>Speciality</p>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            >
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          {/* Degree */}
          <div className="flex flex-col gap-1">
            <p>Education</p>
            <input
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              type="text"
              placeholder="Enter education details"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <p>Address</p>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              placeholder="Address line 1"
              className="border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            />
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              type="text"
              placeholder="Address line 2"
              className="border rounded-lg px-4 py-2.5 mt-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            />
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write a short description about the doctor..."
            rows={5}
            className="border rounded-lg w-full px-4 py-2.5 resize-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform hover:scale-[1.02]"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
