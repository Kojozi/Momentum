import React, { useState } from 'react';
import { Card, Button } from './UI';
import { Check, X, ChevronDown, ChevronUp, Crown, Zap } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#262626]">
      <button 
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-white">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const Subscription: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="max-w-7xl mx-auto pb-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-16 pt-8">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
          INVEST IN YOUR <span className="text-primary">PERFORMANCE</span>.
        </h1>
        
        {/* Toggle */}
        <div className="inline-flex bg-[#171717] p-1 rounded-full border border-[#262626] relative">
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
          >
            Yearly
            <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide ${billingCycle === 'yearly' ? 'bg-black text-white' : 'bg-primary/20 text-primary'}`}>
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-start">
        
        {/* Starter */}
        <div className="bg-[#171717]/50 border border-[#262626] rounded-2xl p-8 flex flex-col h-full hover:border-white/20 transition-colors">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-2">STARTER</h3>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">For the casuals</p>
          </div>
          <div className="mb-8">
            <span className="text-4xl font-black text-white">Free</span>
          </div>
          <Button variant="outline" className="w-full mb-8 border-[#262626] text-white hover:bg-white/10">
            CURRENT PLAN
          </Button>
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-white" />
              <span className="text-gray-300">Manual Workout Logging</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-white" />
              <span className="text-gray-300">Basic Stats History</span>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <X className="w-5 h-5 text-red-500" />
              <span className="text-gray-500 line-through">AI Neural Coaching</span>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <X className="w-5 h-5 text-red-500" />
              <span className="text-gray-500 line-through">Retail Rewards</span>
            </div>
          </div>
        </div>

        {/* Pro Athlete - Hero Card */}
        <div className="bg-[#0a0a0a] border border-primary rounded-2xl p-8 flex flex-col h-full relative shadow-[0_0_50px_-10px_rgba(139,92,246,0.2)] scale-105 z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-lg">
            Most Popular
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5 fill-current" /> PRO ATHLETE
            </h3>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">For the obsessed</p>
          </div>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="text-5xl font-black text-white">99 SEK</span>
            <span className="text-gray-500 font-bold line-through text-lg">199 SEK</span>
            <span className="text-gray-500 text-sm">/mo</span>
          </div>
          
          <Button className="w-full mb-3 py-4 text-lg shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)]">
            UPGRADE NOW
          </Button>
          <p className="text-center text-xs text-gray-400 mb-8 font-medium">
            Don't leave rewards on the table. Join 10k+ Pro users.
          </p>

          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-1 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
              <span className="text-white font-bold">AI Neural Coaching</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-1 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
              <span className="text-white font-bold">Unlimited Rewards (Nike, Gymshark)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-1 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
              <span className="text-white font-bold">Advanced Biometrics</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-1 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
              <span className="text-white font-bold">Community Leaderboard Boost</span>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-[#171717]/50 border border-[#262626] rounded-2xl p-8 flex flex-col h-full hover:border-white/20 transition-colors">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-2">TEAM</h3>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">For clubs & gyms</p>
          </div>
          <div className="mb-8">
            <span className="text-4xl font-black text-white">Custom</span>
          </div>
          <Button variant="outline" className="w-full mb-8 border-[#262626] text-white hover:bg-white/10">
            CONTACT SALES
          </Button>
          <div className="space-y-4 flex-1">
             <p className="text-gray-400 text-sm leading-relaxed">
               Bulk licenses for your entire roster. Includes dedicated support manager and custom team leaderboards.
             </p>
          </div>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-white mb-8 tracking-tight">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="space-y-2">
          <FAQItem 
            question="Can I cancel anytime?" 
            answer="Yes. No contracts, no hidden fees. Cancel via your settings panel with one click. We don't believe in trapping you." 
          />
          <FAQItem 
            question="How does the AI Coaching work?" 
            answer="Momentum analyzes your past workouts, sleep data (if connected), and daily HRV to build a custom regimen every morning. It adapts in real-time." 
          />
          <FAQItem 
            question="Are the rewards real?" 
            answer="Absolutely. We partner directly with brands like Nike, Gymshark, and Whoop. Your sweat equity translates directly into discounts." 
          />
        </div>
      </div>
    </div>
  );
};

export default Subscription;