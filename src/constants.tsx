import React from 'react';
import { View } from './types';

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
export const NAV_ITEMS: { id: View; name: string; icon: React.ReactElement }[] = [
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m0-10v2m0 6v2M6 12H4m16 0h-2m-10 0h2m6 0h2M9 18l-3-3 3-3m6 6l3-3-3-3" />
      </svg>
    ),
  },
  {
    id: 'chat',
    name: 'Chat Assistant',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: 'image',
    name: 'Image Analyzer',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'grounding',
    name: 'Grounding Search',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 16.95l.007-.005a2.174 2.174 0 013.292 0l.006.005L12 18l.964-1.05.006-.005a2.174 2.174 0 013.292 0l.007.005L18 16.95m-5.263-1.95l-.007.005a2.174 2.174 0 00-3.292 0l-.006-.005L6 15l-1.945-2.05A2 2 0 013 11.583V9a2 2 0 012-2h14a2 2 0 012 2v2.583a2 2 0 01-.945 1.707L18 15l-.964 1.05-.006.005a2.174 2.174 0 00-3.292 0l-.007-.005L12 15l-.964 1.05z" />
      </svg>
    ),
  },
  {
    id: 'framework',
    name: 'Framework',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
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