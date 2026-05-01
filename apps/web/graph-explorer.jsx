import React, { useRef, useEffect, useState, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { ontologyTerms, relationshipGraph } from '@ng-analytics/shared';

export default function GraphExplorer() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      
      const handleResize = () => {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const graphData = useMemo(() => {
    const nodes = ontologyTerms.map(term => ({
      id: term.name, // Using name as ID to match relationshipGraph structure
      name: term.name,
      val: term.confidence * 10,
      status: term.status,
      domain: term.domain
    }));

    // Add nodes that exist in relationships but not in ontologyTerms
    const existingNodeIds = new Set(nodes.map(n => n.id));
    relationshipGraph.forEach(([source, , target]) => {
      if (!existingNodeIds.has(source)) {
        nodes.push({ id: source, name: source, val: 5, status: 'Inferred', domain: 'Unknown' });
        existingNodeIds.add(source);
      }
      if (!existingNodeIds.has(target)) {
        nodes.push({ id: target, name: target, val: 5, status: 'Inferred', domain: 'Unknown' });
        existingNodeIds.add(target);
      }
    });

    const links = relationshipGraph.map(([source, label, target]) => ({
      source,
      target,
      name: label
    }));

    return { nodes, links };
  }, []);

  const getNodeColor = (node) => {
    switch(node.status) {
      case 'Curated': return '#34d399'; // Green
      case 'Reviewed': return '#60a5fa'; // Blue
      case 'Proposed': return '#f0a500'; // Golden
      case 'Mapped': return '#c084fc'; // Purple
      default: return '#9ca3af'; // Gray
    }
  };

  return (
    <div className="w-full h-screen bg-[#0d0f14] relative" ref={containerRef}>
      <div className="absolute top-6 left-6 z-10 bg-[#161922]/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl">
        <h1 className="text-xl font-bold text-white mb-2">Interactive Graph</h1>
        <p className="text-xs text-gray-400">Scroll to zoom. Drag nodes to explore relationships.</p>
      </div>

      <ForceGraph2D
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeLabel="name"
        nodeColor={getNodeColor}
        nodeRelSize={6}
        linkColor={() => 'rgba(255,255,255,0.2)'}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        linkLabel="name"
        backgroundColor="#0d0f14"
        d3VelocityDecay={0.3}
      />
    </div>
  );
}
