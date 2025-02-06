import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate & useLocation
import increamentCounter from '../../libs/increamentCounter';
import AuthContext from '../../context/AuthContext';

const LoginForm = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get the last location

  useEffect(() => {
    increamentCounter();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast.loading('Logging in...');
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/login`, { admissionNumber, password });

      toast.success('Login successful! Redirecting...', { id: toastId });
      login(response.data.token);

      // Redirect to last visited page or home if not available
      const redirectPath = location.state?.from?.pathname || '/';
      navigate(redirectPath, { replace: true });
      
    } catch (error) {
      toast.remove();
      console.error('Error during login:', error.response?.data || error.message);
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message === 'User not found') {
          toast.error('User not found. Please check your admission number.');
        } else if (message === 'Invalid credentials') {
          toast.error('Invalid credentials. Please try again.');
        } else if (message === 'Please verify your email before logging in.') {
          toast.error('Please verify your email before logging in.');
        } else {
          toast.error('An unexpected error occurred. Please try again later.');
        }
      } else {
        toast.error('Server is unreachable. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black-2 text-white p-6">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-md shadow-card-2 shadow-white">
        <div className="flex justify-center">
          <img
            src="/assets/NEXUStext.png"
            alt="NEXUS"
            className="flex w-[20rem] items-center object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="admissionNumber" className="text-sm font-medium">Admission Number</label>
            <input
              type="text"
              id="admissionNumber"
              className="text-black-2 mt-1 px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
              placeholder="Enter your admission number"
              value={admissionNumber}
              onChange={(e) => setAdmissionNumber(e.target.value.toUpperCase())}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="text-black-2 mt-1 px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition-all focus:ring-2 focus:ring-blue-700 focus:outline-none"
          >
            Login
          </button>
          <p className="text-center text-sm">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
          </p>
          <p className="text-center text-sm">
            Don't remember the password? <a href="/forgot-password" className="text-blue-500 hover:underline">Reset Password</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
