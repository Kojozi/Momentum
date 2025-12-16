import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import WorkoutLab from './components/WorkoutLab';
import LandingPage from './components/LandingPage';
import Subscription from './components/Subscription';
import { Home, Dumbbell, MessageSquare, Settings, LogOut, Wallet, Crown } from 'lucide-react';
import { askCoach } from './services/geminiService';
import { AppView } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;

    const newHistory = [...chatHistory, { role: 'user' as const, text: chatQuery }];
    setChatHistory(newHistory);
    setChatQuery('');
    setChatLoading(true);

    try {
      const response = await askCoach(chatQuery);
      setChatHistory([...newHistory, { role: 'model' as const, text: response }]);
    } catch (err) {
      setChatHistory([...newHistory, { role: 'model' as const, text: "Connection error." }]);
    } finally {
      setChatLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <LandingPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-100 overflow-hidden font-sans selection:bg-primary selection:text-white animate-fade-in">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-[#262626] flex flex-col justify-between p-4 bg-[#0a0a0a]">
        <div>
          <div className="h-12 flex items-center gap-3 px-2 mb-12">
            <div className="relative group">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
               <div className="relative w-10 h-10 bg-[#0a0a0a] ring-1 ring-white/10 rounded-xl flex items-center justify-center">
                  <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary text-2xl pr-0.5">M</span>
               </div>
            </div>
            <span className="font-bold text-xl tracking-tight hidden lg:block text-white">MOMENTUM</span>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all ${currentView === 'dashboard' ? 'bg-[#171717] text-white border border-[#262626] shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Home</span>
            </button>
            <button 
              onClick={() => setCurrentView('lab')}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all ${currentView === 'lab' ? 'bg-[#171717] text-white border border-[#262626] shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <Dumbbell className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Workouts</span>
            </button>
             <button 
              onClick={() => setChatOpen(!chatOpen)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all ${chatOpen ? 'text-primary bg-primary/10 border border-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Coach</span>
            </button>
             <button 
              onClick={() => setCurrentView('subscription')}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all ${currentView === 'subscription' ? 'bg-[#171717] text-white border border-[#262626] shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
             >
              <Crown className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Membership</span>
            </button>
             <button className="w-full flex items-center gap-4 px-3 py-3 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all">
              <Settings className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Settings</span>
            </button>
          </nav>
        </div>

        <div className="space-y-2 border-t border-[#262626] pt-4">
            <div className="px-3 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary"></div>
              <div className="hidden lg:block">
                <p className="text-sm font-bold text-white">Alex D.</p>
                <p className="text-xs text-gray-500">Pro Plan</p>
              </div>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="w-full flex items-center gap-4 px-3 py-3 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden lg:block font-medium">Log Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-20 border-b border-[#262626] flex items-center justify-between px-8 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-20">
          <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">
            {currentView === 'dashboard' ? 'Operations Center' : currentView === 'lab' ? 'Regimen Generator' : 'Subscription'}
          </h1>
          <div className="flex items-center gap-4">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
             <span className="text-xs font-mono text-gray-500">SYSTEM ONLINE</span>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative z-10">
          {currentView === 'dashboard' ? (
            <Dashboard onNavigate={setCurrentView} />
          ) : currentView === 'lab' ? (
            <WorkoutLab />
          ) : (
            <Subscription />
          )}
        </div>

        {/* AI Chat Overlay */}
        {chatOpen && (
          <div className="absolute right-8 bottom-8 w-96 bg-[#171717] border border-[#262626] rounded-xl shadow-2xl flex flex-col z-50 h-[500px] overflow-hidden animate-slide-up">
            <div className="p-4 border-b border-[#262626] bg-[#0a0a0a] flex justify-between items-center">
              <span className="font-bold text-sm tracking-widest text-primary uppercase">Momentum Intelligence</span>
              <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-white">&times;</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatHistory.length === 0 && (
                <div className="text-center text-gray-600 mt-20 text-sm">
                  <p>Ask me anything about your training.</p>
                  <p className="mt-2 text-xs opacity-50">I don't do pep talks.</p>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-[#262626] text-gray-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                   <div className="bg-[#262626] p-3 rounded-lg text-xs text-gray-400 animate-pulse">Computing...</div>
                </div>
              )}
            </div>
            <form onSubmit={handleChat} className="p-4 bg-[#0a0a0a] border-t border-[#262626]">
              <div className="relative">
                <input 
                  type="text" 
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  placeholder="Type command..."
                  className="w-full bg-[#171717] border border-[#262626] rounded-lg pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                />
                <button type="submit" disabled={!chatQuery} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary disabled:opacity-50">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;