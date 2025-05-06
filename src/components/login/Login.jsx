
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        email,
        password,
      });

      const { token, message } = response.data;
      localStorage.setItem('token', token);
      setSuccessMsg(message);
      setError('');

      // Redirect to home after login
      setTimeout(() => {
        window.location.href = '/products';
      }, 1000);// 1-second delay to show success message
    } catch (err) {
      setSuccessMsg('');
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          required
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMsg && <p className="text-green-500 text-sm mb-4">{successMsg}</p>}

        <button
          type="submit"
          className="w-full relative top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;











