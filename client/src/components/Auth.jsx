import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signup from "../assets/signup.png";

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarUrl: ''
}

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, phoneNumber, avatarUrl } = form;

    const URL = 'http://localhost:4000/auth';

    const { data: { token, userId, hashedPassword,fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
      username, password, fullName:form.fullName, phoneNumber, avatarUrl,
    });
    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userId', userId);
    if (isSignup) {
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarUrl', avatarUrl);
      cookies.set('hashedPassword', hashedPassword);
    }

    window.location.reload();  //we are doing reload bcz we do not want to hit auth bcz we have auth token
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 p-8 bg-white rounded shadow-md">
        <div className="text-center mb-6">
          <p className="text-2xl font-semibold text-gray-700">
            {isSignup ? "Sign Up" : "Sign In"}
          </p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="inline-block text-gray-700 text-sm font-bold mb-2"
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="inline-block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="inline-block text-gray-700 text-sm font-bold mb-2"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Mobile Number"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="password"
                className="inline-block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
                required
              />
            </div>

            {isSignup && (
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="inline-block text-gray-700 text-sm font-bold mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {isSignup && (
              <div className="mb-4">
                <label
                  htmlFor="avatarUrl"
                  className="inline-block text-gray-700 text-sm font-bold mb-2"
                >
                  Avatar URL
                </label>
                <input
                  type="text"
                  name="avatarUrl"
                  id="avatarUrl"
                  placeholder="Avatar URL"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {/*form signup/signin button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>

          <div>
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span
                onClick={() => setIsSignup((prevIsSignup) => !prevIsSignup)}
                className="text-blue-500 cursor-pointer ml-2"
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <img src={signup} alt="signup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Auth;
