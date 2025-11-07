import React from 'react';
import { View } from './types';

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
export const NAV_ITEMS: { id: View; name: string; icon: React.ReactElement }[] = [
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-6.75-8.632l13.5 5.764m-13.5-5.764l13.5 5.764" />
      </svg>
    ),
  },
  {
    id: 'chat',
    name: 'Agent Assistant',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'image',
    name: 'Vision Agent',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'grounding',
    name: 'Research Agent',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M12 15v6m-4-4l4 4 4-4" />
      </svg>
    ),
  },
  {
    id: 'framework',
    name: 'Framework',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
    )
  }
];

export const OPTIMIZATION_OPTIONS = {
  trees: ['Decision Trees', 'Search Trees (A*, Monte Carlo)', 'Metaheuristic Trees (Genetic Algo)', 'Pruning (Alpha-Beta)', 'Fuzzy Logic Trees'],
  functions: ['Convex (Quadratic)', 'Non-Convex (Rastrigin)', 'Cross-Entropy Loss', 'Mean Squared Error', 'Log-Cosh Loss'],
  models: ['Fine-tuning Foundational Model', 'Ensemble Methods (Boosting)', 'Quantization-Aware Training', 'Model Pruning'],
  algorithms: ['Stochastic Gradient Descent', 'Adam Optimizer', 'Nesterov Momentum', 'RMSProp', 'Adafactor Optimizer'],
};