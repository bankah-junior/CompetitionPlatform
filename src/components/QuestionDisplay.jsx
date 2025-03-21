import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const questions = {
  "Round One": [
    { "question": "Write a program to check if an integer is even or odd.", "duration": 2 },
    { "question": "Write a program that takes the radius and returns the area of a circle in decimals.", "duration": 2 },
    { "question": "Write a program that calculates for the hypothenus given the length of the opposite and adjacent.", "duration": 3 },
    { "question": "Write a program that prints all the numbers from 1 to 20 that are divisible by 2 and 3.", "duration": 2 },
    { "question": "Write a program to convert a given number from Celsius to Fahrenheit.", "duration": 2 },
    { "question": "Write a program that prints all the even numbers divisible by 4 in the range [1,20].", "duration": 2 },
    { "question": "Write a program that takes a number as input and displays the count down of that number to 0 with an increment of 1.", "duration": 2 },
    { "question": "Write a program to print the multiplication table of a given number (Up to 12).", "duration": 3 },
    { "question": "Write a program to check if a given number is positive, negative or 0.", "duration": 2 },
    { "question": "Write a program to print all the even numbers between 50 and 100.", "duration": 2 },
    { "question": "Write a program that calculates for someone's year of birth given their age.", "duration": 2 },
    { "question": "Write a program to swap the values of two variables.", "duration": 2 },
    { "question": "Write a program to take an integer input from the user and display (*) that number of times.", "duration": 2 },
    { "question": "Write a program that takes an integer input in the range of [1,10] then prints the numbers from 1 to 10 without it.", "duration": 3 },
    { "question": "Write a program that takes 5 integer inputs and returns the largest number.", "duration": 3 },
    { "question": "Write a program that takes time in seconds and returns the number of minutes in the provided time.", "duration": 2 },
    { "question": "Write a program to find the factorial of a number.", "duration": 4 },
    { "question": "Write a program that asks the user for a password and checks if it's more than 8 characters long.", "duration": 2 },
    { "question": "Write a program a program that takes a number and tells whether it's in the ones, tens or hundreds.", "duration": 3 }
  ],
  "Round Two": [
    { "question": "Write a program that accepts a word input from the user and removes all vowels from the word. Then returns the new word as output.", "duration": 3 },
    { "question": "Write a program that accepts a word input from the user and returns all the vowels in the word.", "duration": 3 },
    { "question": "Write a program that takes a string input and counts the number of characters in it.", "duration": 2 },
    { "question": "Write a program that takes a sentence as input and counts the number of spaces in it.", "duration": 2 },
    { "question": "Write a function that capitalizes the first letter of each word in a sentence.", "duration": 3 },
    { "question": "Write a function that checks if a given string is a palindrome.", "duration": 3 },
    { "question": "Implement a program to find the length of the longest word in a sentence.", "duration": 3 },
    { "question": "Write a program to replace all occurrences of a specified character in a string.", "duration": 2 },
    { "question": "Write a program that returns the first three characters from a given string.", "duration": 2 },
    { "question": "Write a function that finds the index of the first occurrence of a specified character in a string.", "duration": 3 },
    { "question": "Create a function that removes all punctuation from a sentence.", "duration": 4 },
    { "question": "Write a program that checks if two strings have the same set of characters.", "duration": 4 },
    { "question": "Create a function that trims a given string to a specified length and adds ellipsis (...).", "duration": 3 },
    { "question": "Create a program that converts all vowels in a string to uppercase.", "duration": 3 },
    { "question": "Write a program that replaces spaces in a sentence with underscores.", "duration": 2 },
    { "question": "Write a program that swaps the first and last characters of a string.", "duration": 3 },
    { "question": "Write a program that encrypts a string by replacing vowels with \"*\" and any other characters with \"#\".", "duration": 4 }
  ],
  "Round Three": [
    { "question": "Write a program that lets the user input a 2x2 array and displays it.", "duration": 3 },
    { "question": "Write a program that accepts elements for a 3x3 array and returns all the odd numbers in the array.", "duration": 4 },
    { "question": "Write a program to find the sum of all elements in a 1D array.", "duration": 2 },
    { "question": "Write a program that calculates the average of elements in a 1D array.", "duration": 2 },
    { "question": "Write a function to find the maximum element in a 1D array.", "duration": 2 },
    { "question": "Write a function to check if a given element exists in a 1D array.", "duration": 2 },
    { "question": "Write a function to count the occurrences of a specific number in a 1D array.", "duration": 3 },
    { "question": "Create a program to find the product of all elements in a 1D array.", "duration": 3 },
    { "question": "Write a program that finds the second largest element in a 1D array.", "duration": 4 },
    { "question": "Write a function to find the sum of the main diagonal elements in a square 2D array.", "duration": 3 },
    { "question": "Create a function to find the row with the maximum sum in a 2D array.", "duration": 4 },
    { "question": "Create a function to replace all occurrences of a specific number in a 2D array with 0.", "duration": 3 },
    { "question": "Create a program to find the largest element in each row of a 3x3 array.", "duration": 3 },
    { "question": "Create a function to find the index of the first occurrence of a specific element in a 1D array.", "duration": 3 },
    { "question": "Create a program to remove all negative numbers from a 1D array.", "duration": 3 },
    { "question": "Implement a function to find the sum of two arrays.", "duration": 3 },
    { "question": "Create a function to check if two arrays are equal.", "duration": 3 },
    { "question": "Write a program to find the common elements between two arrays.", "duration": 4 },
    { "question": "Write a program to find the mode (most frequent element) in a 1D array.", "duration": 4 },
    { "question": "Create a function to check if a 1D array is a palindrome.", "duration": 4 },
    { "question": "Write a program to return the lower diagonal elements of a matrix.", "duration": 4 },
    { "question": "Write a program to return the even upper diagonal elements of a matrix.", "duration": 4 },
    { "question": "Write a program that finds the missing number in a 1D array of numbers from 0 to 9.", "duration": 3 },
    { "question": "Write a program that returns the index of a given value in a 1D array.", "duration": 2 }
  ]
};

function QuestionDisplay() {
  const [currentRound, setCurrentRound] = useState("Round One");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions[currentRound][0].duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsTimeUp(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    setTimeLeft(questions[currentRound][currentQuestionIndex].duration * 60);
    setIsTimeUp(false);
    setIsRunning(false);
  }, [currentRound, currentQuestionIndex]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    setIsRunning(true);
    setIsTimeUp(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeft(questions[currentRound][currentQuestionIndex].duration * 60);
    setIsTimeUp(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions[currentRound].length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const currentQuestion = questions[currentRound][currentQuestionIndex];

  return (
    <div className="space-y-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 justify-between items-center mb-6">
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center">
            <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">Question Display</h2>
            <div className="flex items-center space-x-4">
              <select
                className="bg-white/10 text-white border border-white/20 rounded-md px-3 py-2"
                value={currentRound}
                onChange={(e) => {
                  setCurrentRound(e.target.value);
                  setCurrentQuestionIndex(0);
                }}
              >
                {Object.keys(questions).map(round => (
                  <option key={round} value={round}>{round}</option>
                ))}
              </select>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`p-1 rounded ${currentQuestionIndex === 0 ? 'text-gray-500' : 'text-white hover:bg-white/10'}`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-white">Question {currentQuestionIndex + 1}/{questions[currentRound].length}</span>
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions[currentRound].length - 1}
                  className={`p-1 rounded ${currentQuestionIndex === questions[currentRound].length - 1 ? 'text-gray-500' : 'text-white hover:bg-white/10'}`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-8 sm:space-x-4">
            <div className="text-4xl font-mono text-white">
              <Clock className="inline-block mr-2 h-8 w-8" />
              {formatTime(timeLeft)}
            </div>
            <button
              onClick={handleStartTimer}
              disabled={isRunning}
              className={`px-4 py-2 rounded-md ${
                isRunning
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white font-medium`}
            >
              Start
            </button>
            <button
              onClick={handleResetTimer}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6 mb-6">
          <p className="text-xl text-white">{currentQuestion.question}</p>
          <p className="text-sm text-white/60 mt-2">Time Allowed: {currentQuestion.duration} minutes</p>
        </div>

        {isTimeUp && (
          <div className="text-center py-4 bg-red-500/20 rounded-lg border border-red-500/50">
            <p className="text-3xl font-bold text-red-500 animate-pulse">Time Up !!!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionDisplay;