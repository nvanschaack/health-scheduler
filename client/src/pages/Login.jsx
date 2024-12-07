import React from "react";
import { useState, useEffect } from "react";
import auth from "../utils/auth";

//import API
import { login } from "../utils/universalApi";

export default function Login() {
  useEffect(() => {
    auth.checkIfProviderOrPatient();
  }, []);

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login(loginInfo);
      const { token, user } = await response.json();
      //store token in localStorage because we need access to it after the user has logged in
      auth.storeToken(token, user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 border border-blue-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-blue-800 text-sm font-semibold mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Username"
                value={loginInfo.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           text-gray-700 transition-colors duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-blue-800 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="******************"
                value={loginInfo.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           text-gray-700 transition-colors duration-200"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                           hover:bg-blue-700 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:ring-opacity-50 
                           transition-colors duration-200"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
