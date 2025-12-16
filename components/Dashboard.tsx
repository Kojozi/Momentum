import React from 'react';
import { Card, Button } from './UI';
import { Zap, Activity, Trophy, ArrowRight } from 'lucide-react';
import { AppView } from '../types';

const Dashboard: React.FC<{ onNavigate: (view: AppView) => void }> = ({ onNavigate }) => {
  // SVG Config
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // ~439.8
  const strokeWidth = 14;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full auto-rows-min animate-fade-in pb-8">
      {/* Top Card: AI Coach Morning Briefing */}
      <Card className="col-span-1 md:col-span-3 bg-gradient-to-br from-[#171717] to-[#1a1a1a] relative overflow-hidden group border-primary/20">
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-500">
            <Zap className="w-64 h-64 text-white -rotate-12 translate-x-12 -translate-y-12" />
         </div>
         <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </div>
                  <h2 className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Morning Briefing</h2>
               </div>
               <div>
                 <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">Recovery focus today, Alex.</h3>
                 <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                   Your HRV is down <span className="text-red-400 font-bold">12%</span>. Skip the HIIT session; go for a Zone 2 run instead to restore baseline.
                 </p>
               </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => onNavigate('lab')} className="shrink-0 flex items-center gap-2 px-8">
                 ACCEPT PLAN <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
         </div>
      </Card>

      {/* Middle Section: Stats Cards */}
      <Card title="Active Calories" className="flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden group">
         <div className="absolute top-4 right-4 text-secondary/20 group-hover:text-secondary/40 transition-colors">
            <FlameIcon />
         </div>
         <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Cyan Progress Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
               {/* Background Track */}
               <circle 
                  cx="80" cy="80" r={radius} 
                  stroke="#1f1f1f" strokeWidth={strokeWidth} 
                  fill="transparent" 
               />
               {/* Progress Value (850/1000 = 85%) */}
               <circle 
                  cx="80" cy="80" r={radius} 
                  stroke="#06b6d4" strokeWidth={strokeWidth} 
                  fill="transparent" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={circumference * (1 - 0.85)} 
                  strokeLinecap="round" 
                  className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]" 
               />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-5xl font-black text-white tracking-tighter">850</span>
               <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">kCal</span>
            </div>
         </div>
      </Card>

      <Card title="Momentum Score" className="flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden group">
         <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/40 transition-colors">
            <Activity className="w-6 h-6" />
         </div>
         <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Purple Progress Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
               {/* Background Track */}
               <circle 
                  cx="80" cy="80" r={radius} 
                  stroke="#1f1f1f" strokeWidth={strokeWidth} 
                  fill="transparent" 
               />
               {/* Progress Value (89/100 = 89%) */}
               <circle 
                  cx="80" cy="80" r={radius} 
                  stroke="#8b5cf6" strokeWidth={strokeWidth} 
                  fill="transparent" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={circumference * (1 - 0.89)} 
                  strokeLinecap="round" 
                  className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(139,92,246,0.4)]" 
               />
            </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-5xl font-black text-white tracking-tighter">89</span>
               <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">/ 100</span>
            </div>
         </div>
      </Card>

      <Card title="Workouts This Week" className="flex flex-col justify-between min-h-[280px]">
         <div className="flex-1 flex items-end gap-2 w-full px-2 mt-4">
             {[40, 60, 30, 80, 50, 90, 20].map((h, i) => (
               <div key={i} className="flex-1 bg-[#262626] rounded-t-sm relative group overflow-hidden">
                  <div style={{height: `${h}%`}} className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 ${i === 5 ? 'bg-secondary shadow-[0_0_15px_rgba(6,182,212,0.6)]' : 'bg-gray-700 group-hover:bg-gray-500'}`}></div>
               </div>
             ))}
         </div>
         <div className="mt-6 flex items-baseline justify-between border-t border-[#262626] pt-4">
            <div>
              <span className="text-3xl font-black text-white block leading-none">4</span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Completed</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-white block leading-none">3</span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Remaining</span>
            </div>
         </div>
      </Card>

      {/* Bottom Section: Gamification/Rewards */}
      <Card className="col-span-1 md:col-span-3 flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#171717]/80">
         <div className="flex items-center gap-6 w-full lg:w-auto">
            <div className="w-20 h-20 rounded-2xl bg-[#0a0a0a] border border-[#262626] flex items-center justify-center shadow-xl text-yellow-500 group relative overflow-hidden">
               <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <Trophy className="w-10 h-10 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            </div>
            <div>
               <h3 className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-1">Current Balance</h3>
               <div className="text-5xl font-black text-white tracking-tighter flex items-baseline gap-2">
                  450 <span className="text-lg font-bold text-secondary tracking-normal">PTS</span>
               </div>
            </div>
         </div>
         
         <div className="flex-1 w-full max-w-2xl bg-[#0a0a0a] p-6 rounded-xl border border-[#262626]">
             <div className="flex justify-between items-center mb-3">
               <span className="text-white font-bold tracking-tight flex items-center gap-2">
                 <Zap className="w-4 h-4 text-yellow-500" /> 
                 Next Reward: 20% Off Nike
               </span>
               <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">50 PTS away</span>
             </div>
             <div className="h-4 bg-[#262626] rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2 -translate-x-full animate-[shimmer_2s_infinite]"></div>
                <div className="h-full bg-secondary w-[90%] rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)] relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-full bg-white/50"></div>
                </div>
             </div>
         </div>

         <Button variant="outline" className="shrink-0 whitespace-nowrap w-full lg:w-auto hover:bg-white hover:text-black hover:border-white transition-all">
            OPEN WALLET
         </Button>
      </Card>
    </div>
  );
};

const FlameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.243-2.143.5-3.5a6 6 0 0 1 1.5 3.5z"/></svg>
)

export default Dashboard;