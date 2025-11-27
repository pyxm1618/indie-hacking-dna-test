
import React from 'react';
import { ResultData } from './types';
import { QuadRadar } from './components';
import wechatQr from './assets/wechat-qr.jpg';

// --- ICONS (Styled for Dark Mode) ---
const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);

const CapabilityBar = ({ label, percentage, colorClass }: { label: string, percentage: number, colorClass: string }) => {
  let level = "待提升";
  let levelColor = "text-slate-500";
  
  if (percentage >= 80) { level = "S级天赋"; levelColor = "text-amber-400"; }
  else if (percentage >= 60) { level = "A级优秀"; levelColor = "text-blue-400"; }
  else { level = "潜力觉醒中"; levelColor = "text-slate-400"; }

  return (
    <div className="mb-5">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">
        <span>{label}</span>
        <span className={`${levelColor} drop-shadow-sm`}>{percentage}% / {level}</span>
      </div>
      <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
        <div 
          className={`h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export const ResultsPage = ({ result }: { result: ResultData }) => {
  const { type, percentages } = result;

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 pb-20 relative overflow-hidden">
      
      {/* --- Ambient Background Effects --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000"></div>
      <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- Header Banner --- */}
      <div className="relative z-10 pt-16 pb-12 px-6 text-center">
         <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-[0.2em] mb-6 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.2)] animate-fade-in-up">
           {type.tier}
         </div>
         
         <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight animate-fade-in-up delay-100">
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
             {type.name}
           </span>
         </h1>
         
         <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200 border-l-2 border-indigo-500 pl-6 italic">
           "{type.description}"
         </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-20 space-y-6">
        
        {/* --- Card 1: Core Portrait & Radar (Glassmorphism) --- */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl animate-fade-in-up delay-300">
           <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                 <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full"></span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">能力基因图谱</span>
                 </h2>
                 <CapabilityBar label="机会敏感 (Opportunity)" percentage={percentages.opportunity} colorClass="bg-gradient-to-r from-indigo-500 to-indigo-400" />
                 <CapabilityBar label="执行迭代 (Execution)" percentage={percentages.execution} colorClass="bg-gradient-to-r from-blue-500 to-cyan-400" />
                 <CapabilityBar label="学习韧性 (Learning)" percentage={percentages.learning} colorClass="bg-gradient-to-r from-emerald-500 to-teal-400" />
                 <CapabilityBar label="风险平衡 (Risk)" percentage={percentages.risk} colorClass="bg-gradient-to-r from-purple-500 to-pink-400" />
              </div>
              <div className="relative flex flex-col items-center justify-center">
                 {/* Glowing Background for Radar */}
                 <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full"></div>
                 <QuadRadar percentages={percentages} darkMode={true} />
              </div>
           </div>
        </div>

        {/* --- Card 2: Deep Analysis --- */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-lg animate-fade-in-up delay-400">
           <h3 className="text-xl font-bold text-white mb-4">🧬 深度解码</h3>
           <p className="text-slate-300 leading-relaxed text-justify text-lg font-light">
             {type.coreAnalysis}
           </p>
        </div>

        {/* --- Card 3: Path & Plan --- */}
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up delay-500">
           {/* Path Card */}
           <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-indigo-400/50 transition-colors">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <TargetIcon />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300"><TargetIcon /></div>
                <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider">最佳变现路径</h3>
              </div>
              <p className="text-white font-bold text-xl leading-relaxed drop-shadow-md">
                {type.path}
              </p>
           </div>
           
           {/* Plan Card */}
           <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300"><CalendarIcon /></div>
                <h3 className="text-sm font-bold text-blue-200 uppercase tracking-wider">90天进化蓝图</h3>
              </div>
              <ul className="space-y-4">
                 {type.plan.map((p, i) => (
                   <li key={i} className="flex gap-4 text-sm text-slate-300 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">{i+1}</span>
                      <span className="pt-0.5">{p}</span>
                   </li>
                 ))}
              </ul>
           </div>
        </div>

        {/* --- Card 4: Advice --- */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-lg animate-fade-in-up delay-600">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-300"><SparklesIcon /></div>
                <h3 className="text-xl font-bold text-white">关键突破点</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {type.advice.map((adv, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                   <p className="text-sm text-slate-300 font-medium leading-relaxed">
                     {adv}
                   </p>
                </div>
              ))}
            </div>
        </div>

        {/* --- WeChat Conversion Card --- */}
        <div className="relative group overflow-hidden rounded-3xl p-[2px] animate-fade-in-up delay-700">
           {/* Animated Border Gradient */}
           <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 animate-spin-slow opacity-70 blur-sm"></div>
           
           <div className="relative bg-slate-900 rounded-[22px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-4 text-center md:text-left z-10">
                <h3 className="text-2xl font-bold text-white">
                   <span className="text-emerald-400">开启第二阶段</span>：环境加持
                </h3>
                <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                   基因决定了你的底牌，但环境决定了你能赢多少。
                   <br/>加入「小概率创业」，获取针对<span className="text-white font-bold mx-1">{type.name}</span>的专属搞钱资源包。
                </p>
             </div>
             
             {/* QR Code Container */}
             <div className="flex flex-col items-center z-10">
                <div className="bg-white p-2 rounded-xl w-32 h-32 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                   <img 
                      src={wechatQr}
                      alt="小概率创业二维码" 
                      className="w-full h-full object-cover rounded-lg"
                   />
                </div>
                <div className="mt-3 flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                   <span className="text-xs text-emerald-300 font-mono tracking-wide">ID: 小概率创业</span>
                </div>
             </div>
             
             {/* Decoration */}
             <div className="absolute right-[-50px] bottom-[-50px] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
           </div>
        </div>

        <div className="h-12"></div>
      </div>
    </div>
  );
};
