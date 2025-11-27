
export interface Option {
  text: string;
  score: number; // 1 to 4 points
}

export interface Question {
  id: number;
  category: 'Opportunity' | 'Execution' | 'Learning' | 'Risk';
  text: string;
  options: Option[];
}

export interface PersonalityType {
  code: string;
  name: string; // e.g., "开拓型创造者"
  tier: string; // e.g., "第1层：高价值创造者"
  description: string;
  coreAnalysis: string; // 深度特征分析
  path: string; // 最适合的发展路径
  plan: string[]; // 3个月行动规划
  advice: string[]; // 个性化提升建议
}

export interface Scores {
  opportunity: number;
  execution: number;
  learning: number;
  risk: number;
}

export interface ResultData {
  type: PersonalityType;
  scores: Scores;
  percentages: Scores;
}
