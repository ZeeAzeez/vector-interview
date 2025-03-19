"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import questionsData from "@/data/questions.json";

export default function InterviewQuestions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questionsData[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish(); // Automatically finish the quiz when time runs out
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(updatedAnswers);
  };

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

  // Calculate score and show result
  const handleFinish = () => {
    let totalScore = 0;
    questionsData.forEach((question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      if (
        selectedAnswerIndex !== undefined &&
        question.answerOptions[selectedAnswerIndex].isCorrect
      ) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setTimeLeft(20 * 60);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center px-6">
      {showResult ? (
        // Result Screen
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quiz Completed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your Score: {score} / {questionsData.length}
          </p>
          {score >= 8 ? (
            <p className="text-green-600 font-semibold mb-6">
              Well done! We will get back to you soon. 🎉
            </p>
          ) : (
            <p className="text-red-600 font-semibold mb-6">
              Oops! Try again next time. You can do better! 💪
            </p>
          )}
          <Button
            onClick={restartQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Restart Quiz
          </Button>
        </div>
      ) : (
        // Quiz Screen
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-center">
          <div className="text-sm font-semibold text-gray-500 mb-2">
            ⏳ Time Left: {formatTime(timeLeft)}
          </div>

          <h2 className="text-sm font-semibold text-gray-500 mb-2">
            Question {currentQuestionIndex + 1} / {questionsData.length}
          </h2>

          <p className="text-lg font-bold text-black mb-4">
            {currentQuestion.question}
          </p>

          <div className="space-y-3">
            {currentQuestion.answerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full px-4 py-2 border rounded transition ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {option.answer}
              </button>
            ))}
          </div>

          {/* ✅ Navigation Buttons */}
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

            {currentQuestionIndex === questionsData.length - 1 ? (
              <Button
                onClick={handleFinish}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
              >
                Finish
              </Button>
            ) : (
              <Button
                onClick={nextQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
