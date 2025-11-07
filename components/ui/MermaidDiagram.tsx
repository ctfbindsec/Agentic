import React, { useEffect, useId } from 'react';

// mermaid is globally available from the script tag in index.html
declare const mermaid: any;

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const id = `mermaid-diagram-${useId()}`;

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const container = document.getElementById(id);
        if (container) {
          // The render function needs the chart definition to be in the DOM
          container.innerHTML = chart;
          // Tell mermaid to render the diagram in the specified container
          await mermaid.run({ nodes: [container] });
        }
      } catch (e) {
        console.error("Error rendering mermaid diagram:", e);
      }
    };
    
    if (chart) {
        renderDiagram();
    }
  }, [chart, id]);
  
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
        {/* The key forces a re-mount on change, ensuring a clean render */}
         <div id={id} className="mermaid" key={chart}>
            {chart}
        </div>
    </div>
  );
};

export default MermaidDiagram;
