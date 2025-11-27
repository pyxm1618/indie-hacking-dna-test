import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { QUESTIONS } from './constants';
import { calculateResults } from './utils';
import { Option, ResultData } from './types';
import { LandingPage, QuestionCard, LoadingScreen } from './components';
import { ResultsPage } from './Results';

type ViewState = 'LANDING' | 'QUIZ' | 'LOADING' | 'RESULTS';

const App = () => {
  const [view, setView] = useState<ViewState>('LANDING');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [result, setResult] = useState<ResultData | null>(null);

  const startQuiz = () => {
    setView('QUIZ');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = useCallback((option: Option) => {
    const currentQ = QUESTIONS[currentQuestionIndex];
    
    // Store answer
    const newAnswers = { ...answers, [currentQ.id]: option };
    setAnswers(newAnswers);

    // Move to next or finish
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // Add a tiny delay for better UX feel
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        window.scrollTo(0, 0);
      }, 150);
    } else {
      finishQuiz(newAnswers);
    }
  }, [answers, currentQuestionIndex]);

  const finishQuiz = (finalAnswers: Record<number, Option>) => {
    setView('LOADING');
    
    // Simulate calculation delay for dramatic effect
    setTimeout(() => {
      const calculatedResult = calculateResults(finalAnswers);
      setResult(calculatedResult);
      setView('RESULTS');
      window.scrollTo(0, 0);
    }, 2500);
  };

  return (
    <main className="font-sans antialiased text-slate-900">
      {view === 'LANDING' && <LandingPage onStart={startQuiz} />}
      
      {view === 'QUIZ' && (
        <div className="min-h-screen bg-slate-50 pt-12 px-4 pb-12">
          <QuestionCard 
            question={QUESTIONS[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentNum={currentQuestionIndex + 1}
            totalNum={QUESTIONS.length}
          />
        </div>
      )}

      {view === 'LOADING' && <LoadingScreen />}

      {view === 'RESULTS' && result && <ResultsPage result={result} />}
    </main>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
