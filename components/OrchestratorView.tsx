import React, { useState, useCallback, useMemo } from 'react';
import { OPTIMIZATION_OPTIONS } from '../constants';
import { OptimizationSelections } from '../types';
import { getQuickAnalysis, getDeepDive } from '../services/geminiService';
import Button from './ui/Button';
import Card from './ui/Card';
import Loader from './ui/Loader';
import Select from './ui/Select';
import MermaidDiagram from './ui/MermaidDiagram';

type AnalysisMode = 'quick' | 'deep';

const OrchestratorView: React.FC = () => {
  const [selections, setSelections] = useState<OptimizationSelections>({
    tree: OPTIMIZATION_OPTIONS.trees[0],
    func: OPTIMIZATION_OPTIONS.functions[0],
    model: OPTIMIZATION_OPTIONS.models[0],
    algo: OPTIMIZATION_OPTIONS.algorithms[0],
  });
  const [mode, setMode] = useState<AnalysisMode>('quick');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSelectionChange = useCallback((category: keyof OptimizationSelections, value: string) => {
    setSelections(prev => ({ ...prev, [category]: value }));
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setResult('');
    setError('');
    try {
      const response = mode === 'quick'
        ? await getQuickAnalysis(selections)
        : await getDeepDive(selections);
      setResult(response.text);
    } catch (e) {
      setError('An error occurred while generating the analysis. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const mermaidChart = useMemo(() => {
    const { tree, algo, model, func } = selections;
    const sanitize = (text: string) => text.replace(/"/g, '#quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `
    graph LR;
        A["<b>Algorithm</b><br/>${sanitize(algo)}"]:::main;
        B["<b>Function</b><br/>${sanitize(func)}"]:::main;
        C["<b>Model</b><br/>${sanitize(model)}"]:::main;
        D["<b>Tree Structure</b><br/>${sanitize(tree)}"]:::main;

        A -- uses --> B;
        B -- evaluates --> C;
        D -- guides/prunes --> C;
        
        classDef main fill:#21262D,stroke:#2F81F7,stroke-width:2px,color:#E6EDF3,rx:8,ry:8;
    `;
  }, [selections]);
  
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-bold text-text mb-2">Agent Orchestrator</h1>
      <p className="text-text-secondary mb-6">Train your agents, simplistically intuitive.</p>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* Left Column: Config & Visualization */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Tree Structure" value={selections.tree} options={OPTIMIZATION_OPTIONS.trees} onChange={(e) => handleSelectionChange('tree', e.target.value)} />
            <Select label="Objective Function" value={selections.func} options={OPTIMIZATION_OPTIONS.functions} onChange={(e) => handleSelectionChange('func', e.target.value)} />
            <Select label="Optimization Model" value={selections.model} options={OPTIMIZATION_OPTIONS.models} onChange={(e) => handleSelectionChange('model', e.target.value)} />
            <Select label="Base Algorithm" value={selections.algo} options={OPTIMIZATION_OPTIONS.algorithms} onChange={(e) => handleSelectionChange('algo', e.target.value)} />
          </div>

          <Card className="flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-primary mb-2">Component Interaction Flow</h2>
              <div className="flex-1 min-h-[200px]">
                <MermaidDiagram chart={mermaidChart} />
              </div>
          </Card>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 bg-surface p-1 rounded-lg border border-border">
              <Button onClick={() => setMode('quick')} variant={mode === 'quick' ? 'primary' : 'secondary'} size="sm">
                Quick Analysis (Flash-Lite)
              </Button>
              <Button onClick={() => setMode('deep')} variant={mode === 'deep' ? 'primary' : 'secondary'} size="sm">
                Deep Dive (Pro w/ Thinking)
              </Button>
            </div>
            <Button onClick={handleSubmit} disabled={isLoading} size="lg">
              {isLoading ? 'Generating...' : 'Generate Plan'}
            </Button>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="overflow-y-auto">
          <Card>
            {isLoading && <Loader text={`Generating ${mode === 'quick' ? 'quick analysis' : 'deep dive'}...`} />}
            {error && <p className="text-red-400">{error}</p>}
            {result && (
              <div className="prose prose-invert max-w-none prose-pre:bg-background prose-pre:p-4 prose-pre:rounded-md prose-pre:border prose-pre:border-border">
                  <pre className="whitespace-pre-wrap font-mono text-sm">{result}</pre>
              </div>
              )}
            {!isLoading && !result && !error && (
              <div className="text-center text-text-secondary py-16">
                <h3 className="text-lg font-semibold">Your AI-generated optimization plan will appear here.</h3>
                <p>Select your components and click "Generate Plan" to begin.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrchestratorView;