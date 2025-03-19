"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CandidateInterviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Candidate Interview
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to your interview! Click the button below when you’re ready to
          begin.
        </p>

        <Link href="/candidate-interview-page/interview-questions">
          <Button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}
