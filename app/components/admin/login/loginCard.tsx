"use client";

import React, { useState, FormEvent, JSX } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

  const [nameAdmin, setName] = useState("");
  const [passwordAdmin, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  console.log("BASE_API:", BASE_API);

  const handleSubmit = async (e: FormEvent) => {
     e.preventDefault();
  setError("");

  if (!nameAdmin || !passwordAdmin) {
    setError("Name dan password wajib diisi.");
    return;
  }

  try {
    const res = await axios.post(`${BASE_API}/admin/login`, {
      nameAdmin,
      passwordAdmin,
    });

    console.log("Login response:", res.data.data);

    if (res.status !== 200) {
      throw new Error("Login gagal. Periksa kembali data.");
    }

    const { token, user } = res.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(user));

    router.push("/admin");

  } catch (err: any) {
    console.error(err);

    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError("Login gagal. Periksa kembali data.");
    }
  }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 mt-14">
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        <div className="flex flex-col md:flex-row">
          {/* Welcome Section - Left */}
          <div className="w-full md:w-2/5 bg-gradient-to-b from-primary to-secondary p-10 flex flex-col justify-between text-white">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Rds Admin Page</h1>
              <div className="w-20 h-1 bg-white mb-6" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Welcome To</h2>
              <h3 className="text-3xl md:text-4xl font-bold">Admin Page</h3>
            </div>

            <div className="mt-8">
              <p className="text-white/80 text-lg">
                Welcome to your digital garden! Feel free to plant new ideas, nurture your current projects with a few edits, or clear out the old growth to make room for something fresh and wonderful.
              </p>
            </div>
          </div>

          {/* Form Section - Right */}
          <div className="w-full md:w-3/5 p-8 md:p-12 bg-white">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
                <p className="text-gray-600 mt-2">Sign in to access your account</p>
              </div>

              {error && <p className="text-red-600 text-center mb-4">{error}</p>}

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="Name" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    id=""
                    name="name"
                    type="name"
                    value={nameAdmin}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={passwordAdmin}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-200 from-secondary to-indigo-700 cursor-pointer text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Login
                </button>
              </form>

              <div className="mt-8 text-center">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
