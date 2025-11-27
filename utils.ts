
import { QUESTIONS, PERSONALITY_TYPES } from './constants';
import { ResultData, Option, Question, Scores } from './types';

export const calculateResults = (answers: Record<number, Option>): ResultData => {
  const scores: Scores = {
    opportunity: 0,
    execution: 0,
    learning: 0,
    risk: 0
  };

  // 1. Calculate Raw Scores (Sum of 1-4 points)
  // Max score per dim = 7 questions * 4 = 28
  // Min score per dim = 7 questions * 1 = 7
  Object.keys(answers).forEach((key) => {
    const qId = parseInt(key);
    const option = answers[qId];
    const question = QUESTIONS.find(q => q.id === qId);

    if (question && option) {
      if (question.category === 'Opportunity') scores.opportunity += option.score;
      if (question.category === 'Execution') scores.execution += option.score;
      if (question.category === 'Learning') scores.learning += option.score;
      if (question.category === 'Risk') scores.risk += option.score;
    }
  });

  // 2. Calculate Percentages
  // (Score / 28) * 100
  const percentages: Scores = {
    opportunity: Math.round((scores.opportunity / 28) * 100),
    execution: Math.round((scores.execution / 28) * 100),
    learning: Math.round((scores.learning / 28) * 100),
    risk: Math.round((scores.risk / 28) * 100)
  };

  // 3. Determine Type (Waterfall Logic based on Thresholds)
  // High: >= 80, Med: 60-79, Low: < 60
  const { opportunity: O, execution: E, learning: L, risk: R } = percentages;
  let typeKey = "ACCUMULATOR"; // Default

  // Logic heuristics based on PRD descriptions
  
  // --- Tier 1: High Value Creators ---
  const avg = (O + E + L + R) / 4;
  
  // Pioneer: All around high
  if (avg >= 78 && O >= 75 && E >= 75 && L >= 75 && R >= 70) {
    typeKey = "PIONEER";
  }
  // Product: High Opp & Learning, maybe lower Risk/Exec but strong product sense
  else if (O >= 80 && L >= 75 && avg >= 70) {
    typeKey = "PRODUCT";
  }
  // Execution: High Exec & Learning
  else if (E >= 80 && L >= 75 && avg >= 70) {
    typeKey = "EXECUTION";
  }

  // --- Tier 2: Potential Cultivators ---
  // Opportunity Discoverer: High Opp, Lower Exec
  else if (O >= 75 && E < 70) {
    typeKey = "OPPORTUNITY";
  }
  // Steady Builder: High Exec, Risk Averse (Lower Risk Score? Or High Risk management?)
  // PRD implies "Risk Averse" -> usually means low tolerance. 
  // But in our scoring, High Risk score = "Healthy/Bold", Low Risk score = "Fearful".
  // So Steady Builder = High Exec, Low Risk Score.
  else if (E >= 70 && R < 60) {
    typeKey = "STEADY";
  }
  // Adapter: High Learning, scattered focus (maybe Avg Exec)
  else if (L >= 75) {
    typeKey = "ADAPTER";
  }

  // --- Tier 3: Risk Alert ---
  // Theoretical: High Opp/Learn, Very Low Exec
  else if (O >= 70 && E < 60) {
    typeKey = "THEORETICAL";
  }
  // Safety: Very Low Risk score, Med/High Exec (in comfort zone)
  else if (R < 50 && E >= 50) {
    typeKey = "SAFETY";
  }
  
  // --- Tier 4: Accumulator ---
  // If none match, it defaults to ACCUMULATOR (Low overall)
  else {
    typeKey = "ACCUMULATOR";
  }

  return {
    type: PERSONALITY_TYPES[typeKey],
    scores,
    percentages
  };
};
