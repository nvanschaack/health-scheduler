import React from "react";
import { useState, useEffect } from "react";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-blue-100 space-y-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-blue-800 text-sm font-semibold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 border border-blue-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           text-gray-700 transition-colors duration-200"
                id="grid-first-name"
                type="text"
                placeholder="First name"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block text-blue-800 text-sm font-semibold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 border border-blue-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           text-gray-700 transition-colors duration-200"
                id="grid-last-name"
                type="text"
                placeholder="Last name"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-blue-800 text-sm font-semibold mb-2"
              htmlFor="grid-username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         text-gray-700 transition-colors duration-200"
              id="grid-username"
              type="text"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-blue-800 text-sm font-semibold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         text-gray-700 transition-colors duration-200"
              id="grid-password"
              type="password"
              placeholder="******************"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-blue-800 text-sm font-semibold mb-2"
              htmlFor="grid-age"
            >
              Age
            </label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         text-gray-700 transition-colors duration-200"
              id="grid-age"
              type="number"
              placeholder="25"
              required
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
