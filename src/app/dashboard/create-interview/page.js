"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function CreateInterview() {
  // for handling form
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");

  //to handle form submission
  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      //to send POST request to the mock API
      const response = await axios.post(
        "https://67d555f9d2c7857431f0146c.mockapi.io/vector-interviews/interviews",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        setMessage("Interview Created Successfully!");
        reset();
      } else {
        setMessage("Error creating interview.");
      }
    } catch (error) {
      setMessage("Network error. Try again later.");
      console.error("API Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 mt-10 text-center">
          Create Interview
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <label className="block text-md font-medium text-gray-700 mb-2">
              Interview Title
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter interview title"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows="4"
              placeholder="Enter interview description"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700 mb-2">
              Questions (Separate multiple questions with commas)
            </label>
            <input
              {...register("questions")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter questions"
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
            >
              Create Interview
            </Button>
          </div>

          {message && (
            <p className="mt-6 text-center text-lg font-semibold text-green-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
