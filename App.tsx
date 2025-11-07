import React, { useState, useCallback } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import OrchestratorView from './components/OrchestratorView';
import ChatView from './components/ChatView';
import ImageView from './components/ImageView';
import GroundingView from './components/GroundingView';
import FrameworkView from './components/FrameworkView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('orchestrator');

  const handleSetView = useCallback((view: View) => {
    setActiveView(view);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'orchestrator':
        return <OrchestratorView />;
      case 'chat':
        return <ChatView />;
      case 'image':
        return <ImageView />;
      case 'grounding':
        return <GroundingView />;
      case 'framework':
        return <FrameworkView />;
      default:
        return <OrchestratorView />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-text">
      <Sidebar activeView={activeView} setView={handleSetView} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;