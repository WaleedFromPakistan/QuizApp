"use client";
import React, { useState, useEffect } from 'react';
import questionFetch from './questions';

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(10);
  const [isDisabled, setIsDisabled] = useState(false);
  const [score, setScore] = useState(0); 
  const [quizFinished, setQuizFinished] = useState(false);  


  useEffect(() => {
    setQuestions(questionFetch);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];


  useEffect(() => {
    if (timer > 0 && !isDisabled) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsDisabled(true);
      setSelectedOption('wrong'); 
    }
  }, [timer, isDisabled]);

 
  const handleOptionClick = (option) => {
    if (isDisabled) return;

    if (option === currentQuestion.answer) {
      setSelectedOption('correct');
      setScore((prevScore) => prevScore + 1); 
    } else {
      setSelectedOption('wrong');
    }
    setIsDisabled(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsDisabled(false);
    setTimer(10);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true); 
    }
  };

  
  if (questions.length === 0) {
    return <div className="text-center mt-10">Loading questions...</div>;
  }


  if (quizFinished) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Quiz Finished!</h2>
          <p className="text-xl mt-4">Your Score: {score}/{questions.length}</p>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100">
    
      <div className="w-3/4 bg-white shadow-lg rounded-lg p-4 mt-10">
        <div className="flex justify-between items-center">
        
          <h2 className="text-2xl font-bold">
            Question {currentQuestionIndex + 1}/{questions.length}
          </h2>
       
          <div className="text-red-500 text-xl font-bold">Timer: {timer}s</div>
        </div>
      </div>

     
      <div className="w-3/4 bg-white shadow-lg rounded-lg p-6 mt-6">
 
        <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg text-white text-lg ${
                selectedOption === null
                  ? 'bg-blue-500'
                  : option === currentQuestion.answer
                  ? 'bg-green-500'
                  : selectedOption === 'wrong' && option !== currentQuestion.answer
                  ? 'bg-red-500'
                  : 'bg-gray-400'
              }`}
              onClick={() => handleOptionClick(option)}
              disabled={isDisabled}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

  
      {isDisabled && (
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleNextQuestion}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Main;
