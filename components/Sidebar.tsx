import React from 'react';
import { View } from '../types';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  activeView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setView }) => {
  return (
    <aside className="w-16 md:w-64 bg-surface p-2 md:p-4 flex flex-col space-y-2 transition-all duration-300 border-r border-border">
      <div className="flex items-center justify-center md:justify-start mb-6">
        <div className="bg-primary p-2 rounded-lg">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold ml-3 hidden md:block">Agentic AI</h1>
      </div>
      <nav className="flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center p-3 my-1 rounded-lg transition-colors duration-200 relative ${
              activeView === item.id
                ? 'bg-secondary text-white'
                : 'text-text-secondary hover:bg-secondary hover:text-white'
            }`}
          >
            {activeView === item.id && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full"></div>}
            {item.icon}
            <span className="ml-4 hidden md:block">{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;