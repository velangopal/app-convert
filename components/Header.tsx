
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            AppBuilder AI
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Templates</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-colors">
            Account
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
