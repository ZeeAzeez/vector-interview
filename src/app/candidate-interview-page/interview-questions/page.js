"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import questionsData from "@/data/questions.json";

export default function InterviewQuestions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);

  const currentQuestion = questionsData[currentQuestionIndex];

  //counts down every second
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  //time format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  //Navigation function
  const nextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
        <div className="text-lg font-bold text-gray-700 mb-4">
          ⏳ Time Left: {formatTime(timeLeft)}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Question {currentQuestionIndex + 1} / {questionsData.length}
        </h2>
        <p className="text-gray-600 mb-6">{currentQuestion.question}</p>

        <div className="space-y-3">
          {currentQuestion.answerOptions.map((option, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 border rounded hover:bg-blue-100 transition"
            >
              {option.answer}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <Button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 ${
              currentQuestionIndex === 0
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded`}
          >
            Previous
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questionsData.length - 1}
            className={`px-4 py-2 ${
              currentQuestionIndex === questionsData.length - 1
                ? "bg-gray-300"
                : "bg-green-500 hover:bg-green-600"
            } text-white rounded`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
