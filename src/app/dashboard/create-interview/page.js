"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function CreateInterview() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
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
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Create Interview</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Interview Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Questions (Separate multiple questions with commas)
          </label>
          <input
            {...register("questions")}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <Button type="submit" className="bg-green-500 text-white">
          Create Interview
        </Button>

        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
}
