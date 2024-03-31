"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { groq } from "next-sanity";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Added reset function from useForm
  } = useForm<LoginFormInputs>();

  const [contactQueries, setContactQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const onSubmit = async (data: LoginFormInputs) => {
    if (data.email === "ayan@maxsimpower.com" && data.password === "test@123") {
      toast.success("Logged in successfully!");
      const projectId = "b8xc3xdp";
      const datasetName = "production";

      const combinedQuery = groq`{
        "requests" :*[_type == 'contact'] {
            firstName,
            email,
            phoneNumber,
            message
          }
      }`;

      try {
        setLoading(true);
        const response = await fetch(
          `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${datasetName}?query=${encodeURIComponent(
            combinedQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        setContactQueries(responseData.result.requests);
        setShowWelcome(true);
        setShowForm(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  useEffect(() => {
    const shouldShowWelcome = localStorage.getItem("showWelcome");
    if (shouldShowWelcome === "true") {
      setShowWelcome(true);
      setShowForm(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("showWelcome");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      style={{ minHeight: "65vh" }}
    >
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        {showForm && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Form fields */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login to view queries
            </h2>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {/* Render cards if showWelcome is true */}
        {showWelcome && (
          <div className="mt-8 space-y-6">
            <h2 className="text-3xl font-bold">Management Dashboard</h2>
            <div className="border-b-4 border-blue-500 w-44 mb-2"></div>
            {contactQueries.map((contact, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-md shadow-md mt-4"
                style={{ overflowWrap: "break-word" }}
              >
                <p>
                  <strong>First Name:</strong> {contact.firstName}
                </p>
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {contact.phoneNumber}
                </p>
                <p>
                  <strong>Message:</strong> {contact.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
