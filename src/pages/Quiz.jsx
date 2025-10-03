import { useState, useEffect } from 'react';
import quizData from '../data/bibleQuiz.json';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    score: 0,
    showResults: false,
    answers: [],
    timeLeft: 30,
    selectedAnswer: null,
  });

  useEffect(() => {
    const shuffledQuestions = shuffleArray(quizData)
      .slice(0, 5)
      .map(q => {
        const correctOptionText = q.options[q.correctAnswer];
        const shuffledOptions = shuffleArray([...q.options]);
        const newCorrectAnswerIndex = shuffledOptions.findIndex(
          option => option === correctOptionText
        );

        return {
          ...q,
          options: shuffledOptions,
          correctAnswer: newCorrectAnswerIndex
        };
      });
    setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuizState((prev) => {
        if (prev.timeLeft === 0 || prev.showResults || prev.selectedAnswer !== null) {
          return prev;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (quizState.timeLeft === 0 && quizState.selectedAnswer === null) {
      handleNext();
    }
  }, [quizState.timeLeft]);

  const handleAnswer = (selectedOption) => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: selectedOption
    }));
  };

  const handleNext = () => {
    const currentQuestion = questions[quizState.currentQuestion];
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = quizState.selectedAnswer ?? -1;

    const newState = {
      ...quizState,
      answers: newAnswers,
      timeLeft: 30,
      selectedAnswer: null,
    };

    if (quizState.selectedAnswer === currentQuestion.correctAnswer) {
      newState.score = quizState.score + 1;
    }

    if (quizState.currentQuestion === questions.length - 1) {
      newState.showResults = true;
    } else {
      newState.currentQuestion = quizState.currentQuestion + 1;
    }

    setQuizState(newState);
  };

  const restartQuiz = () => {
    const shuffledQuestions = shuffleArray([...quizData])
      .slice(0, 5)
      .map(q => {
        const correctOptionText = q.options[q.correctAnswer];
        const shuffledOptions = shuffleArray([...q.options]);
        const newCorrectAnswerIndex = shuffledOptions.findIndex(
          option => option === correctOptionText
        );

        return {
          ...q,
          options: shuffledOptions,
          correctAnswer: newCorrectAnswerIndex
        };
      });
    setQuestions(shuffledQuestions);

    setQuizState({
      currentQuestion: 0,
      score: 0,
      showResults: false,
      answers: [],
      timeLeft: 30,
      selectedAnswer: null,
    });
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (quizState.showResults) {
    return (
      <div className="py-4 px-4 min-h-[calc(100vh-4rem)] overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Quiz Results</h2>
            <p className="text-lg text-center mb-8">
              Score: <span className="font-semibold text-blue-600">{quizState.score}</span> / {questions.length}
            </p>

            <div className="space-y-4 mb-4">
              {questions.map((q, idx) => (
                <div key={idx} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600">Question {idx + 1}</span>
                    {quizState.answers[idx] === q.correctAnswer ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Correct</span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">Incorrect</span>
                    )}
                  </div>

                  <p className="font-medium mb-3">{q.question}</p>

                  <div className="space-y-2 mb-3">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2 rounded ${
                          optIdx === q.correctAnswer
                            ? 'bg-green-50 border border-green-500'
                            : optIdx === quizState.answers[idx] && optIdx !== q.correctAnswer
                            ? 'bg-red-50 border border-red-500'
                            : 'bg-gray-50'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-700">
                    <span className="font-medium">Explanation: </span>
                    {q.explanation}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={restartQuiz}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];

  return (
    <div className="my-2 p-4 min-h-[calc(100vh-4rem)]">
      <div className="max-w-2xl mx-auto h-full">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Question {quizState.currentQuestion + 1}/{questions.length}</span>
              <span className={`text-sm font-medium ${quizState.timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
                Time: {quizState.timeLeft}s
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000"
                style={{ width: `${(quizState.timeLeft / 30) * 100}%` }}
              />
            </div>

            <h2 className="text-lg font-semibold">{currentQuestion.question}</h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={quizState.selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all
                    ${quizState.selectedAnswer === null
                      ? 'hover:bg-gray-50 hover:border-blue-300'
                      : ''
                    }
                    ${quizState.selectedAnswer === index
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                      : quizState.selectedAnswer !== null && index === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : 'border-gray-200'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              {quizState.selectedAnswer === null ? 'Skip Question' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
