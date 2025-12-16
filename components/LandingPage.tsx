import React, { useState } from 'react';
import { Button, ShinyButton, SpotlightCard } from './UI';
import { BrainCircuit, Trophy, Users, ArrowRight, Zap, LineChart, X, MessageSquare, Activity, Check, Crown } from 'lucide-react';

const ProModal: React.FC<{ isOpen: boolean; onClose: () => void; onSignup: () => void }> = ({ isOpen, onClose, onSignup }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fade-in" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        {/* Header - Fixed */}
        <div className="shrink-0 flex items-center justify-between p-6 border-b border-[#262626] bg-[#0a0a0a] z-20">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#8b5cf6]"></div>
            <h2 className="text-white font-bold tracking-widest uppercase text-sm">Pro Mode Preview</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="p-6 space-y-8">
            
            {/* AI Coach Chat */}
            <div className="space-y-4">
               <h3 className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                 <MessageSquare className="w-4 h-4" /> AI Analysis
               </h3>
               <div className="bg-[#171717] rounded-xl p-4 border border-[#262626] flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                     <BrainCircuit className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                     <p className="text-white font-medium text-sm leading-relaxed">
                       I analyzed your last run. You're heel-striking. <span className="text-primary font-bold">Increase cadence by 5%</span> to reduce knee impact and improve efficiency.
                     </p>
                     <p className="text-gray-500 text-xs mt-2 font-mono">12:42 PM • MOMENTUM INTELLIGENCE</p>
                  </div>
               </div>
            </div>

            {/* Graph Section */}
            <div className="space-y-4">
               <h3 className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                 <Activity className="w-4 h-4" /> Heart Rate Recovery
               </h3>
               <div className="h-48 w-full bg-[#171717] rounded-xl border border-[#262626] p-4 relative overflow-hidden flex flex-col justify-end">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
                  {/* CSS/SVG Graph */}
                  <div className="h-32 w-full flex items-end justify-between gap-1 z-10">
                     {[40, 45, 30, 60, 55, 70, 65, 80, 75, 90, 85, 95].map((h, i) => (
                        <div key={i} className="w-full bg-[#262626] relative group rounded-t-sm hover:bg-primary/50 transition-colors" style={{height: `${h}%`}}>
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {h} BPM
                           </div>
                        </div>
                     ))}
                  </div>
                  {/* Line overlay simulation */}
                  <svg className="absolute inset-0 h-full w-full pointer-events-none px-4 pb-4 pt-12" preserveAspectRatio="none">
                     <path d="M0 100 L 30 90 L 60 110 L 90 60 L 120 70 L 150 50 L 180 60 L 210 30 L 240 40 L 270 20 L 300 30 L 600 10" fill="none" stroke="#8b5cf6" strokeWidth="2" vectorEffect="non-scaling-stroke" className="drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] opacity-50" />
                  </svg>
               </div>
            </div>
            
            {/* Large Spacer to ensure content scrolls above the gradient footer */}
            <div className="h-32"></div> 
          </div>
        </div>

        {/* Footer CTA - Absolute with gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent z-30 pt-12">
           <ShinyButton onClick={onSignup} className="w-full shadow-2xl">
              Unlock Real Data (Start Trial)
           </ShinyButton>
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [showProModal, setShowProModal] = useState(false);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen animate-pulse" style={{animationDuration: '4s'}} />
      <div className="fixed bottom-0 right-0 w-[800px] h-[600px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <ProModal 
        isOpen={showProModal} 
        onClose={() => setShowProModal(false)} 
        onSignup={onLogin} 
      />

      {/* Navbar */}
      <nav className="relative z-50 w-full px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative group">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
             <div className="relative w-10 h-10 bg-[#0a0a0a] ring-1 ring-white/10 rounded-xl flex items-center justify-center">
                <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary text-2xl pr-0.5">M</span>
             </div>
          </div>
          <span className="font-bold text-xl tracking-widest text-white uppercase">Momentum</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={() => scrollToId('features')} className="hover:text-white transition-colors">Features</button>
          <button onClick={() => scrollToId('community')} className="hover:text-white transition-colors">Community</button>
          <button onClick={() => scrollToId('pricing')} className="hover:text-white transition-colors">Pricing</button>
        </div>

        <Button variant="outline" onClick={onLogin} className="px-6 py-2 text-sm border-white/20 text-white hover:border-primary hover:text-primary">
          LOGIN
        </Button>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-20 lg:py-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8">
          <Zap className="w-3 h-3" />
          <span>v2.0 System Online</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          YOUR POTENTIAL.<br />
          QUANTIFIED.
        </h1>
        
        <p className="max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
          The all-in-one fitness ecosystem. Activity tracking, AI coaching, and real-world rewards. Stop using five different apps.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <ShinyButton onClick={() => scrollToId('pricing')}>
            Start Free Trial
          </ShinyButton>
          <Button 
            variant="outline" 
            onClick={() => setShowProModal(true)} 
            className="text-lg px-8 py-4 bg-black/50 backdrop-blur-md border-white/10 text-white hover:bg-white/5 hover:border-white/30 flex items-center gap-2 justify-center"
          >
            <LineChart className="w-5 h-5" />
            Explore Pro Data
          </Button>
        </div>
      </header>

      {/* Feature Grid (Bento) */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: AI Insights */}
          <SpotlightCard className="md:col-span-2 p-8">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
               <BrainCircuit className="w-32 h-32 text-primary rotate-12" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">AI Neural Coaching</h3>
                <p className="text-gray-400 max-w-sm">Data without noise. Our Gemini-powered AI doesn't just track numbers; it analyzes your physiology to prescribe the exact stimulus you need.</p>
              </div>
              <div 
                className="mt-8 flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase group-hover:gap-3 transition-all cursor-pointer hover:text-white"
                onClick={() => setShowProModal(true)}
              >
                <span>Analyze Performance</span> <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: Rewards */}
          <SpotlightCard className="p-8">
             <div className="absolute -bottom-4 -right-4 p-4 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
               <Trophy className="w-32 h-32 text-secondary -rotate-12" />
            </div>
            <div className="relative z-10 h-full">
              <h3 className="text-xl font-bold text-white mb-2">Sweat Pays</h3>
              <p className="text-gray-400 text-sm mb-6">Earn discounts for every milestone. Unlock exclusive gear from partner brands.</p>
              <div className="inline-block bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-md text-xs font-bold">
                +500 POINTS
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3: Community */}
          <SpotlightCard className="p-8 group cursor-default">
            <div id="community" className="relative z-10">
               <Users className="w-8 h-8 text-white mb-4" />
               <h3 className="text-xl font-bold text-white mb-2">Compete. Win.</h3>
               <p className="text-gray-400 text-sm">Join the global leaderboard. Prove you are the elite.</p>
            </div>
          </SpotlightCard>

          {/* Card 4: Stats/Graph Visual */}
          <SpotlightCard className="md:col-span-2 p-8 flex items-center justify-between gap-12">
             <div className="space-y-2 relative z-10">
                <h3 className="text-3xl font-black text-white italic tracking-tighter">1.2M+</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Workouts Logged</p>
             </div>
             <div className="h-16 w-32 flex items-end gap-1 relative z-10">
                <div className="w-4 bg-gray-800 h-[40%] rounded-t-sm group-hover:bg-primary/40 transition-colors delay-75 duration-300"></div>
                <div className="w-4 bg-gray-800 h-[70%] rounded-t-sm group-hover:bg-primary/60 transition-colors delay-100 duration-300"></div>
                <div className="w-4 bg-gray-800 h-[50%] rounded-t-sm group-hover:bg-primary/50 transition-colors delay-150 duration-300"></div>
                <div className="w-4 bg-gray-800 h-[100%] rounded-t-sm group-hover:bg-primary transition-colors delay-200 duration-300 shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
                <div className="w-4 bg-gray-800 h-[80%] rounded-t-sm group-hover:bg-primary/80 transition-colors delay-300 duration-300"></div>
             </div>
          </SpotlightCard>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 py-20 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            NO CONTRACTS.<br />JUST RESULTS.
          </h2>
          <p className="text-gray-400">Simple pricing. Cancel anytime.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
           {/* Free Plan */}
           <div className="bg-[#171717]/50 border border-[#262626] rounded-2xl p-8 flex flex-col hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">STARTER</h3>
              <span className="text-3xl font-black text-white mb-6">Free</span>
              <ul className="space-y-4 mb-8 flex-1">
                 <li className="flex gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white" /> Manual Logging</li>
                 <li className="flex gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white" /> Basic Stats</li>
              </ul>
              <Button variant="outline" onClick={onLogin} className="w-full">CREATE ACCOUNT</Button>
           </div>

           {/* Pro Plan */}
           <div className="bg-[#0a0a0a] border border-primary rounded-2xl p-8 flex flex-col relative shadow-[0_0_50px_-10px_rgba(139,92,246,0.2)] md:scale-110 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-lg">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                <Crown className="w-5 h-5 fill-current" /> PRO ATHLETE
              </h3>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">99 SEK</span>
                <span className="text-sm text-gray-500">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                 <li className="flex gap-3 text-sm text-white font-bold"><Check className="w-4 h-4 text-primary" /> AI Neural Coach</li>
                 <li className="flex gap-3 text-sm text-white font-bold"><Check className="w-4 h-4 text-primary" /> Exclusive Rewards</li>
                 <li className="flex gap-3 text-sm text-white font-bold"><Check className="w-4 h-4 text-primary" /> Advanced Metrics</li>
              </ul>
              <ShinyButton onClick={onLogin} className="w-full">START TRIAL</ShinyButton>
           </div>

           {/* Team Plan */}
           <div className="bg-[#171717]/50 border border-[#262626] rounded-2xl p-8 flex flex-col hover:border-white/20 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">TEAM</h3>
              <span className="text-3xl font-black text-white mb-6">Custom</span>
              <ul className="space-y-4 mb-8 flex-1">
                 <li className="flex gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white" /> Bulk Licenses</li>
                 <li className="flex gap-3 text-sm text-gray-300"><Check className="w-4 h-4 text-white" /> Team Leaderboards</li>
              </ul>
              <Button variant="outline" className="w-full">CONTACT SALES</Button>
           </div>
        </div>
      </section>

      {/* Social Proof Footer */}
      <footer className="border-t border-[#262626] py-12 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-xs font-bold tracking-[0.3em] uppercase mb-8">Trusted by Elite Athletes from</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:opacity-100 transition-opacity duration-500">
            {/* Simple typography logos for partner brands */}
            <span className="text-xl md:text-2xl font-black font-serif tracking-tighter hover:text-white transition-colors cursor-default">NIKE</span>
            <span className="text-xl md:text-2xl font-black italic hover:text-cyan-400 transition-colors cursor-default">GYMSHARK</span>
            <span className="text-xl md:text-2xl font-black tracking-tight hover:text-white transition-colors cursor-default">UNDER ARMOUR</span>
            <span className="text-xl md:text-2xl font-black hover:text-red-500 transition-colors cursor-default">WHOOP</span>
            <span className="text-xl md:text-2xl font-black font-mono hover:text-white transition-colors cursor-default">CROSSFIT</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;