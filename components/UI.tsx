import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = '', title }) => (
  <div className={`bg-card/80 backdrop-blur-md border border-border rounded-xl p-6 shadow-xl ${className}`}>
    {title && <h3 className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">{title}</h3>}
    {children}
  </div>
);

export const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`group relative overflow-hidden rounded-2xl border border-[#262626] bg-[#171717]/50 backdrop-blur-xl transition-all duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139,92,246,0.1), transparent 40%)`,
        }}
      />
      <div
         className="pointer-events-none absolute inset-0 rounded-2xl border-[1.5px] border-primary opacity-0 transition-opacity duration-300"
         style={{
             opacity,
             maskImage: `radial-gradient(240px circle at ${position.x}px ${position.y}px, black, transparent)`,
             WebkitMaskImage: `radial-gradient(240px circle at ${position.x}px ${position.y}px, black, transparent)`
         }}
      />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
};

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  className?: string;
}> = ({ children, onClick, variant = 'primary', disabled = false, className = '' }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-bold tracking-tight transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]",
    secondary: "bg-secondary text-black hover:bg-secondary/90",
    outline: "border border-border text-gray-300 hover:border-primary hover:text-primary bg-transparent"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const ShinyButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center 
        bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] 
        hover:from-[#7c3aed] hover:to-[#6d28d9]
        text-white text-lg font-extrabold tracking-tight
        px-8 py-4 rounded-xl
        shadow-lg shadow-purple-500/50
        hover:shadow-purple-500/70 hover:scale-105
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0a0a0a]
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`w-full bg-[#0a0a0a] border border-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${props.className}`}
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <div className="relative">
    <select
      {...props}
      className={`w-full bg-[#0a0a0a] border border-border rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${props.className}`}
    >
      {props.children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
);