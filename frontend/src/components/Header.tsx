
import React from 'react';

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="glass sticky top-0 z-50 border-b border-slate-200/50 px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <button 
          onClick={onLogoClick}
          className="flex items-center space-x-2 hover:opacity-75 transition-opacity cursor-pointer"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-200">
            📍
          </div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Nomad<span className="text-indigo-600">Plan</span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
