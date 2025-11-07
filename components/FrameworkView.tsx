import React from 'react';
import Card from './ui/Card';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-background rounded-md p-4 mt-2 text-sm text-text-secondary overflow-x-auto border border-border">
        <code>{children}</code>
    </pre>
);

const FrameworkView: React.FC = () => {
    const beforeAlgo = `algorithms: ['Stochastic Gradient Descent', 'Adam Optimizer', 'Nesterov Momentum', 'RMSProp'],`;
    const afterAlgo = `algorithms: ['Stochastic Gradient Descent', 'Adam Optimizer', 'Nesterov Momentum', 'RMSProp', 'Adafactor Optimizer'],`;

    const beforeModel = `models: ['Fine-tuning Foundational Model', 'Ensemble Methods (Boosting)', 'Quantization-Aware Training', 'Model Pruning'],`;
    const afterModel = `models: ['Fine-tuning Foundational Model', 'Ensemble Methods (Boosting)', 'Quantization-Aware Training', 'Model Pruning', 'Sparse Mixture-of-Experts'],`;

  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text mb-2">Extensibility Framework</h1>
        <p className="text-text-secondary mb-6">A guide to adding new components to the Agentic AI Optimiser.</p>

        <div className="space-y-6">
            <Card>
                <h2 className="text-xl font-semibold text-primary mb-2">Core Concept</h2>
                <p>The application uses a central component registry located in <code className="bg-secondary p-1 rounded text-sm border border-border">src/constants.tsx</code>. All selectable options in the Orchestrator view (trees, functions, models, and algorithms) are populated from the <code className="bg-secondary p-1 rounded text-sm border border-border">OPTIMIZATION_OPTIONS</code> object within this file.</p>
                <p className="mt-2">To add a new component, you simply need to add its name as a string to the appropriate array in this object. The application will automatically detect the new entry, add it to the corresponding dropdown menu, and make it available for generating optimization plans.</p>
            </Card>

            <Card>
                 <h2 className="text-xl font-semibold text-primary mb-2">How to Add a New Component</h2>
                 <p className="mb-4">Follow the examples below to add your custom component. The process is the same for all four component types.</p>
                 
                 <h3 className="text-lg font-semibold text-text mt-4">1. Locate the Registry File</h3>
                 <p>Open the file: <code className="bg-secondary p-1 rounded text-sm border border-border">src/constants.tsx</code></p>

                 <h3 className="text-lg font-semibold text-text mt-4">2. Add Your Component String</h3>
                 <p>Find the relevant array (<code className="bg-secondary p-1 rounded text-sm border border-border">trees</code>, <code className="bg-secondary p-1 rounded text-sm border border-border">functions</code>, <code className="bg-secondary p-1 rounded text-sm border border-border">models</code>, or <code className="bg-secondary p-1 rounded text-sm border border-border">algorithms</code>) and add your new component's name.</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <h3 className="text-lg font-semibold text-text">Example: Adding a New Algorithm</h3>
                    <p className="text-sm text-text-secondary">Let's add the 'Adafactor Optimizer'.</p>
                    <p className="mt-4 text-text">Before:</p>
                    <CodeBlock>{beforeAlgo}</CodeBlock>
                    <p className="mt-4 text-text">After:</p>
                    <CodeBlock>{afterAlgo}</CodeBlock>
                </Card>
                 <Card>
                    <h3 className="text-lg font-semibold text-text">Example: Adding a New Model</h3>
                    <p className="text-sm text-text-secondary">Let's add 'Sparse Mixture-of-Experts'.</p>
                    <p className="mt-4 text-text">Before:</p>
                    <CodeBlock>{beforeModel}</CodeBlock>
                    <p className="mt-4 text-text">After:</p>
                    <CodeBlock>{afterModel}</CodeBlock>
                </Card>
            </div>

            <Card>
                <h2 className="text-xl font-semibold text-primary mb-2">Automatic Integration</h2>
                 <p>No further changes are needed. Once you save <code className="bg-secondary p-1 rounded text-sm border border-border">src/constants.tsx</code>:</p>
                 <ul className="list-disc list-inside mt-2 space-y-1 text-text">
                    <li>The new component will immediately appear in the dropdowns on the "Orchestrator" page.</li>
                    <li>When selected, its name will be included in the prompt sent to the Gemini API for analysis.</li>
                 </ul>
                 <p className="mt-4 font-semibold text-text">Important:</p>
                 <p className="text-text-secondary">The component name you add is passed directly to the AI. Ensure the name is descriptive and well-understood in the context of AI and optimization (e.g., use standard industry terms) to get the best results from the Optimiser.</p>
            </Card>

        </div>
    </div>
  );
};

export default FrameworkView;