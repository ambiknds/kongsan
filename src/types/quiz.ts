export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  showResults: boolean;
  answers: number[];
  timeLeft: number;
  selectedAnswer: number | null;
}
