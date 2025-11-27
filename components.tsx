
import React, { useState, useEffect } from 'react';
import { Question, Option } from './types';
import policeBadge from './assets/police-badge.png';

// --- ICONS ---
export const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

// --- QUAD RADAR CHART (Diamond Shape) ---
export const QuadRadar = ({ 
  percentages,
  darkMode = false
}: { 
  percentages: { opportunity: number, execution: number, learning: number, risk: number },
  darkMode?: boolean
}) => {
  // Normalize 0-100 to 0.1-1.0 scale for drawing
  // Using power to exaggerate high scores
  const normalize = (val: number) => {
    return 0.1 + Math.pow(val / 100, 1.2) * 0.9;
  };

  const o = normalize(percentages.opportunity); // Top
  const e = normalize(percentages.execution);   // Right
  const r = normalize(percentages.risk);        // Bottom
  const l = normalize(percentages.learning);    // Left

  const center = { x: 50, y: 50 };
  const maxR = 40;

  // Points: Top, Right, Bottom, Left
  const p1 = { x: center.x, y: center.y - (o * maxR) };
  const p2 = { x: center.x + (e * maxR), y: center.y };
  const p3 = { x: center.x, y: center.y + (r * maxR) };
  const p4 = { x: center.x - (l * maxR), y: center.y };

  const points = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;

  // Colors based on mode
  const gridStroke = darkMode ? "#334155" : "#e2e8f0"; // slate-700 : slate-200
  const axisStroke = darkMode ? "#475569" : "#cbd5e1"; // slate-600 : slate-300
  const labelFill = darkMode ? "#94a3b8" : "#4f46e5";  // slate-400 : indigo-600
  const shapeFill = darkMode ? "rgba(99, 102, 241, 0.5)" : "rgba(79, 70, 229, 0.3)";
  const shapeStroke = darkMode ? "#818cf8" : "#4f46e5";

  return (
    <div className="relative w-full max-w-[260px] aspect-square mx-auto my-6">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
        {/* Background Grid (Diamond) */}
        <polygon points="50,10 90,50 50,90 10,50" fill={darkMode ? "rgba(30, 41, 59, 0.5)" : "rgba(241, 245, 249, 0.5)"} stroke={axisStroke} strokeWidth="0.5" />
        <polygon points="50,30 70,50 50,70 30,50" fill="none" stroke={gridStroke} strokeWidth="0.5" />
        
        {/* Axis Lines */}
        <line x1="50" y1="10" x2="50" y2="90" stroke={gridStroke} strokeWidth="0.5" />
        <line x1="10" y1="50" x2="90" y2="50" stroke={gridStroke} strokeWidth="0.5" />

        {/* Labels */}
        <text x="50" y="6" textAnchor="middle" className="text-[4px] font-bold" fill={labelFill}>机会敏感</text>
        <text x="94" y="51" textAnchor="start" className="text-[4px] font-bold" fill={labelFill}>执行迭代</text>
        <text x="50" y="96" textAnchor="middle" className="text-[4px] font-bold" fill={labelFill}>风险平衡</text>
        <text x="6" y="51" textAnchor="end" className="text-[4px] font-bold" fill={labelFill}>学习韧性</text>

        {/* Data Shape */}
        <polygon 
          points={points} 
          fill={shapeFill}
          stroke={shapeStroke}
          strokeWidth="1.5"
          className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
        />
        
        {/* Corner Dots */}
        {[p1, p2, p3, p4].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill={shapeStroke} stroke={darkMode ? "#0f172a" : "#fff"} strokeWidth="0.5" />
        ))}
      </svg>
    </div>
  );
};

// --- LANDING PAGE ---
export const LandingPage = ({ onStart }: { onStart: () => void }) => {
  const [count, setCount] = useState(23496);

  useEffect(() => {
    const base = 23496 + Math.floor((Date.now() - 1715000000000) / 3600000); 
    setCount(base);
    const interval = setInterval(() => {
      if (Math.random() > 0.6) setCount(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#333] font-sans overflow-hidden relative flex flex-col items-center justify-between">
       {/* Background Elements */}
       <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
       <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
       <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

       <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex-1 flex flex-col justify-center w-full">
         <div className="inline-block mb-6">
           <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 uppercase tracking-widest shadow-sm">
             Wealth Creation Capability Assessment
           </span>
         </div>

         <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
           解码你的<br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">财富创造能力</span>
         </h1>

         <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
           这不仅仅是一个心理测试，而是一次对你商业潜能的<strong>深度体检</strong>。<br/>
           基于4大核心维度，揭示你最适合的变现路径。
         </p>

         <button 
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white text-xl font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-slate-900/20 mx-auto"
          >
            <span>开始能力测评</span>
            <ArrowRightIcon />
         </button>

         <div className="mt-8 text-sm text-slate-400 font-medium">
            已有 <span className="font-mono text-slate-600">{count.toLocaleString()}</span> 人获取了分析报告
         </div>
       </div>

       {/* Filing Footer */}
       <div className="relative z-20 w-full py-6 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 bg-transparent">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:text-slate-600 transition-colors">
             工信部备案：京ICP备2024069371号-3
          </a>
          <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011402054501" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-600 transition-colors">
             <img src={policeBadge} alt="公安备案图标" className="w-4 h-4" />
             <span>公安备案：京公网安备11011402054501号</span>
          </a>
       </div>
    </div>
  );
};

export const ProgressBar = ({ current, total }: { current: number, total: number }) => {
  const percentage = Math.min(100, (current / total) * 100);
  return (
    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-6 md:mt-10">
      <div 
        className="h-full bg-slate-900 transition-all duration-300 ease-out rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export const QuestionCard = ({ 
  question, 
  onAnswer, 
  currentNum, 
  totalNum 
}: { 
  question: Question, 
  onAnswer: (opt: Option) => void,
  currentNum: number,
  totalNum: number
}) => {
  return (
    // Wrapper for viewport positioning
    <div className="w-full flex flex-col justify-center min-h-[100dvh] md:min-h-0 md:py-20">
      
      {/* Card Container: 
          Mobile: Full height, tight padding, space-between
          Desktop: Centered card, auto height, spacious padding 
      */}
      <div className="
        flex flex-col 
        w-full 
        h-[100dvh] md:h-auto 
        max-w-3xl md:mx-auto 
        px-5 py-6 md:p-10
        md:bg-white md:rounded-3xl md:shadow-2xl md:border md:border-slate-100
        justify-between md:justify-start
        transition-all duration-300
      ">
        
        {/* Header Section */}
        <div className="flex-shrink-0 md:mb-10">
          <div className="flex justify-between items-end mb-4 md:mb-6">
            <span className="text-4xl md:text-6xl font-black text-slate-200 leading-none select-none">
              {currentNum} <span className="text-lg md:text-2xl text-slate-300 font-medium">/ {totalNum}</span>
            </span>
          </div>

          <h2 className="text-xl md:text-3xl font-bold text-slate-900 leading-snug md:leading-tight">
            {question.text}
          </h2>
        </div>

        {/* Options Section: Scrollable on mobile if needed, static on desktop */}
        <div className="flex-1 flex flex-col justify-center gap-3 md:gap-5 my-4 md:my-8 overflow-y-auto md:overflow-visible no-scrollbar">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(option)}
              className="
                w-full text-left 
                p-4 md:p-6 
                rounded-xl md:rounded-2xl 
                bg-white md:bg-slate-50 
                border border-slate-200 md:border-transparent 
                shadow-sm md:shadow-none
                active:scale-[0.98] active:border-indigo-600 active:bg-indigo-50 
                hover:md:bg-white hover:md:shadow-lg hover:md:border-indigo-100 hover:md:translate-y-[-2px]
                transition-all duration-200 
                touch-manipulation group
              "
            >
              <div className="flex items-center gap-3 md:gap-4">
                <span className="
                  flex items-center justify-center 
                  w-6 h-6 md:w-8 md:h-8 
                  rounded-full 
                  bg-slate-100 group-hover:bg-indigo-100 
                  text-slate-500 group-hover:text-indigo-600 
                  text-xs md:text-sm font-bold
                  transition-colors
                ">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-base md:text-xl font-medium text-slate-700 group-hover:text-slate-900">
                  {option.text}
                </span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Footer Progress */}
        <div className="flex-shrink-0 pt-2 md:pt-0">
          <ProgressBar current={currentNum} total={totalNum} />
        </div>
      </div>
    </div>
  );
};

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-bold text-slate-900">正在生成分析报告</h2>
      <p className="text-slate-500 mt-2">基于 4 维核心模型计算中...</p>
    </div>
  );
};
