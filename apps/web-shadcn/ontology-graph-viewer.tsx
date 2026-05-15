import React, { useEffect, useRef, useState, useCallback } from "react";
import { X, ZoomIn, ZoomOut, RefreshCw, ExternalLink, Copy, Check } from "lucide-react";
import InAppBrowser from "./in-app-browser";

const NODE_RADIUS = 32;

const NEO4J_PALETTE = [
  { bg: "#4C8EDA", border: "#2E6BB5", text: "#fff" },
  { bg: "#569480", border: "#3D6B5C", text: "#fff" },
  { bg: "#F25A29", border: "#C04421", text: "#fff" },
  { bg: "#DA7194", border: "#A84E6E", text: "#fff" },
  { bg: "#6DCE9E", border: "#4BA070", text: "#1a1a1a" },
  { bg: "#FFD86E", border: "#C9A84C", text: "#1a1a1a" },
  { bg: "#C990C0", border: "#9A6A98", text: "#fff" },
  { bg: "#57C7E3", border: "#3A9AB5", text: "#1a1a1a" },
  { bg: "#F79767", border: "#C06A40", text: "#1a1a1a" },
  { bg: "#9BDB89", border: "#6AA858", text: "#1a1a1a" },
];

function sanitize(label) {
  return label.replace(/[^a-zA-Z0-9_]/g, "_").replace(/^_+/, "");
}

function buildColorMap(ontology) {
  const map = {};
  let idx = 0;
  ontology.baseTypes.forEach((t) => {
    if (!map[t]) map[t] = NEO4J_PALETTE[idx++ % NEO4J_PALETTE.length];
  });
  ontology.graphEdges.forEach(({ source, target }) => {
    if (!map[source]) map[source] = NEO4J_PALETTE[idx++ % NEO4J_PALETTE.length];
    if (!map[target]) map[target] = NEO4J_PALETTE[idx++ % NEO4J_PALETTE.length];
  });
  return map;
}

function generateCypher(edge) {
  const s = sanitize(edge.source);
  const r = edge.rel.replace(/[^a-zA-Z0-9_]/g, "_").toUpperCase();
  const t = sanitize(edge.target);
  return `MATCH (a:${s})-[:${r}]->(b:${t})\nRETURN a, b\nLIMIT 25`;
}

function buildGraph(ontology) {
  const nodeSet = new Set();
  ontology.baseTypes.forEach((t) => nodeSet.add(t));
  ontology.graphEdges.forEach(({ source, target }) => {
    nodeSet.add(source);
    nodeSet.add(target);
  });
  const nodes = Array.from(nodeSet);
  const count = nodes.length;
  const radius = Math.max(130, count * 30);
  const positions = {};
  nodes.forEach((name, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    positions[name] = { id: name, x: radius * Math.cos(angle), y: radius * Math.sin(angle), vx: 0, vy: 0 };
  });
  return { nodes: positions, edges: ontology.graphEdges };
}

function useForce(initial) {
  const [state, setState] = useState(initial);
  const tick = useCallback(() => {
    setState((prev) => {
      const nodes = { ...prev.nodes };
      const keys = Object.keys(nodes);
      keys.forEach((a) => {
        let fx = 0, fy = 0;
        keys.forEach((b) => {
          if (a === b) return;
          const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const f = 4500 / (dist * dist);
          fx += (dx / dist) * f; fy += (dy / dist) * f;
        });
        fx -= nodes[a].x * 0.003; fy -= nodes[a].y * 0.003;
        nodes[a] = { ...nodes[a], vx: (nodes[a].vx + fx) * 0.82, vy: (nodes[a].vy + fy) * 0.82 };
      });
      prev.edges.forEach(({ source, target }) => {
        if (!nodes[source] || !nodes[target]) return;
        const dx = nodes[target].x - nodes[source].x, dy = nodes[target].y - nodes[source].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (dist - 170) * 0.016;
        const fx = (dx / dist) * f, fy = (dy / dist) * f;
        nodes[source] = { ...nodes[source], vx: nodes[source].vx + fx, vy: nodes[source].vy + fy };
        nodes[target] = { ...nodes[target], vx: nodes[target].vx - fx, vy: nodes[target].vy - fy };
      });
      keys.forEach((k) => { nodes[k] = { ...nodes[k], x: nodes[k].x + nodes[k].vx, y: nodes[k].y + nodes[k].vy }; });
      return { ...prev, nodes };
    });
  }, []);

  const rafRef = useRef(null);
  useEffect(() => {
    let frame = 0;
    const run = () => { tick(); if (++frame < 130) rafRef.current = requestAnimationFrame(run); };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);
  return [state, setState];
}

function CypherSnippet({ edge }) {
  const [copied, setCopied] = useState(false);
  const cypher = generateCypher(edge);
  const copy = () => {
    navigator.clipboard.writeText(cypher);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="rounded-xl border border-white/5 bg-[#0a0d13] p-3 mb-2 group">
      <div className="flex items-start justify-between gap-2">
        <pre className="font-mono text-[11px] text-[#c8cdd8] whitespace-pre-wrap leading-relaxed flex-1">{cypher}</pre>
        <button onClick={copy} className="p-1.5 rounded-lg border border-white/5 text-[#6b7280] hover:text-[#f0a500] hover:border-[#f0a500]/30 transition-colors shrink-0 mt-0.5">
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

export default function OntologyGraphViewer({ ontology, onClose }) {
  const svgRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggingNode, setDraggingNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [browserUrl, setBrowserUrl] = useState(null);
  const isPanning = useRef(false);
  const lastPan = useRef({ x: 0, y: 0 });
  const colorMap = buildColorMap(ontology);
  const [graph, setGraph] = useForce(buildGraph(ontology));

  useEffect(() => {
    setGraph(buildGraph(ontology));
    setZoom(1); setPan({ x: 0, y: 0 }); setSelectedNode(null);
  }, [ontology.id]);

  const svgW = 700, svgH = 460;
  const viewCX = svgW / 2 + pan.x;
  const viewCY = svgH / 2 + pan.y;

  const getConnected = (nid) => {
    const s = new Set();
    graph.edges.forEach(({ source, target }) => { if (source === nid) s.add(target); if (target === nid) s.add(source); });
    return s;
  };
  const activeNode = hoveredNode || selectedNode;
  const connected = activeNode ? getConnected(activeNode) : null;

  const getNodeEdges = (nid) => graph.edges.filter(({ source, target }) => source === nid || target === nid);

  const handleNodeMouseDown = (e, nid) => { e.stopPropagation(); setDraggingNode(nid); };
  const handleNodeClick = (e, nid) => { e.stopPropagation(); setSelectedNode((s) => s === nid ? null : nid); };

  const handleSvgMouseMove = (e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (draggingNode) {
      const sx = (e.clientX - rect.left) * (svgW / rect.width) - viewCX;
      const sy = (e.clientY - rect.top) * (svgH / rect.height) - viewCY;
      setGraph((p) => ({ ...p, nodes: { ...p.nodes, [draggingNode]: { ...p.nodes[draggingNode], x: sx / zoom, y: sy / zoom, vx: 0, vy: 0 } } }));
    } else if (isPanning.current) {
      const dx = (e.clientX - lastPan.current.x) * (svgW / rect.width);
      const dy = (e.clientY - lastPan.current.y) * (svgH / rect.height);
      lastPan.current = { x: e.clientX, y: e.clientY };
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    }
  };

  const handleWheel = (e) => { e.preventDefault(); setZoom((z) => Math.min(3, Math.max(0.3, z - e.deltaY * 0.001))); };

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-5xl max-h-[90vh] flex flex-col bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
          <div>
            <div className="font-mono text-[10px] text-[#f0a500] font-bold uppercase tracking-widest mb-0.5">{ontology.namespace} · Neo4j Type Graph</div>
            <h2 className="text-lg font-bold text-white">{ontology.name} — <span className="text-[#9ca3af] font-normal text-base">{ontology.fullName}</span></h2>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setBrowserUrl(ontology.url)} className="flex items-center gap-1 text-[11px] text-[#6b7280] hover:text-[#f0a500] px-2.5 py-1.5 rounded-lg border border-white/5 hover:border-[#f0a500]/30 transition-colors">
              <ExternalLink className="h-3 w-3" /> Spec
            </button>
            {[{ icon: ZoomIn, fn: () => setZoom(z => Math.min(3, z + 0.2)) }, { icon: ZoomOut, fn: () => setZoom(z => Math.max(0.3, z - 0.2)) }, { icon: RefreshCw, fn: () => { setGraph(buildGraph(ontology)); setZoom(1); setPan({ x: 0, y: 0 }); } }, { icon: X, fn: onClose }].map(({ icon: Icon, fn }, i) => (
              <button key={i} onClick={fn} className="p-1.5 rounded-lg border border-white/5 text-[#6b7280] hover:text-[#f0a500] hover:border-[#f0a500]/30 transition-colors">
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Body: Graph + Panels */}
        <div className="flex flex-1 overflow-hidden min-h-0">

          {/* Graph Canvas */}
          <div className="flex-1 relative bg-[#070a0f] select-none" style={{ cursor: draggingNode ? "grabbing" : "grab" }}>
            <svg ref={svgRef} width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ display: "block", height: "100%", minHeight: 360 }}
              onMouseMove={handleSvgMouseMove}
              onMouseDown={(e) => { isPanning.current = true; lastPan.current = { x: e.clientX, y: e.clientY }; }}
              onMouseUp={() => { setDraggingNode(null); isPanning.current = false; }}
              onMouseLeave={() => { setDraggingNode(null); isPanning.current = false; }}
              onWheel={handleWheel}
            >
              <defs>
                <pattern id="gdot" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.04)" />
                </pattern>
                {NEO4J_PALETTE.map((c, i) => (
                  <marker key={i} id={`arr${i}`} markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill={c.bg + "aa"} />
                  </marker>
                ))}
              </defs>
              <rect width={svgW} height={svgH} fill="url(#gdot)" />

              <g transform={`translate(${viewCX}, ${viewCY}) scale(${zoom})`}>
                {/* Edges */}
                {graph.edges.map(({ source, target, rel }, i) => {
                  const s = graph.nodes[source], t = graph.nodes[target];
                  if (!s || !t) return null;
                  const isLit = activeNode && (activeNode === source || activeNode === target);
                  const dimmed = activeNode && !isLit;
                  const dx = t.x - s.x, dy = t.y - s.y;
                  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                  const ex = t.x - (dx / dist) * (NODE_RADIUS + 8), ey = t.y - (dy / dist) * (NODE_RADIUS + 8);
                  const sx2 = s.x + (dx / dist) * NODE_RADIUS, sy2 = s.y + (dy / dist) * NODE_RADIUS;
                  const mx = (s.x + t.x) / 2, my = (s.y + t.y) / 2;
                  const srcColor = colorMap[source] || NEO4J_PALETTE[0];
                  const pIdx = NEO4J_PALETTE.indexOf(srcColor) >= 0 ? NEO4J_PALETTE.indexOf(srcColor) : 0;

                  return (
                    <g key={i} opacity={dimmed ? 0.08 : 1}>
                      <line x1={sx2} y1={sy2} x2={ex} y2={ey}
                        stroke={isLit ? (colorMap[source]?.bg || "#f0a500") : "rgba(255,255,255,0.18)"}
                        strokeWidth={isLit ? 2 : 1}
                        markerEnd={`url(#arr${pIdx})`}
                      />
                      <rect x={mx - rel.length * 3.2} y={my - 9} width={rel.length * 6.4} height={14} rx={3} fill="#070a0f" opacity={0.85} />
                      <text x={mx} y={my + 1.5} textAnchor="middle" fontSize="9" fill={isLit ? "#eef0f4" : "#6b7280"} fontFamily="monospace" fontWeight={isLit ? "700" : "400"}>
                        {rel}
                      </text>
                    </g>
                  );
                })}

                {/* Nodes */}
                {Object.values(graph.nodes).map(({ id: nid, x, y }) => {
                  const color = colorMap[nid] || NEO4J_PALETTE[0];
                  const isBase = ontology.baseTypes.includes(nid);
                  const isSel = selectedNode === nid;
                  const isHov = hoveredNode === nid;
                  const isConn = connected?.has(nid);
                  const dimmed = activeNode && !isSel && !isHov && !isConn;
                  const label = nid.length > 11 ? nid.slice(0, 10) + "…" : nid;

                  return (
                    <g key={nid} transform={`translate(${x}, ${y})`} style={{ cursor: "pointer" }} opacity={dimmed ? 0.15 : 1}
                      onMouseEnter={() => setHoveredNode(nid)} onMouseLeave={() => setHoveredNode(null)}
                      onMouseDown={(e) => handleNodeMouseDown(e, nid)}
                      onClick={(e) => handleNodeClick(e, nid)}
                    >
                      {(isSel || isHov) && <circle r={NODE_RADIUS + 8} fill={color.bg + "22"} stroke={color.bg} strokeWidth={1} strokeDasharray="3 3" />}
                      <circle r={NODE_RADIUS} fill={color.bg} stroke={isSel ? "#fff" : color.border} strokeWidth={isSel ? 3 : 2} />
                      <text y={-5} textAnchor="middle" fontSize="8" fill={color.text + "99"} fontFamily="monospace">:</text>
                      <text y={6} textAnchor="middle" fontSize="9" fontWeight="700" fill={color.text} fontFamily="system-ui, sans-serif">
                        {label}
                      </text>
                      {isBase && <circle r={NODE_RADIUS + 12} fill="none" stroke={color.bg + "44"} strokeWidth={1} />}
                    </g>
                  );
                })}
              </g>
            </svg>

            <div className="absolute bottom-2 left-3 font-mono text-[9px] text-[#4b5563]">
              Drag nodes · Scroll to zoom · Pan canvas · Click to select
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-72 flex flex-col border-l border-white/5 bg-[#0b0e14] overflow-hidden shrink-0">

            {/* Node Legend */}
            <div className="p-4 border-b border-white/5">
              <div className="font-mono text-[10px] text-[#6b7280] uppercase tracking-widest mb-2">Node Labels</div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {Object.entries(colorMap).map(([label, color]) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: color.bg, border: `1.5px solid ${color.border}` }} />
                    <span className="font-mono text-[11px] text-[#c8cdd8] truncate">:{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Node Detail */}
            {selectedNode ? (
              <div className="p-4 border-b border-white/5">
                <div className="font-mono text-[10px] text-[#6b7280] uppercase tracking-widest mb-2">Selected Node</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-4 w-4 rounded-full shrink-0" style={{ backgroundColor: colorMap[selectedNode]?.bg, border: `2px solid ${colorMap[selectedNode]?.border}` }} />
                  <span className="font-mono text-[13px] font-bold text-white">:{selectedNode}</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Base Type</span>
                    <span className={ontology.baseTypes.includes(selectedNode) ? "text-green-400" : "text-[#6b7280]"}>
                      {ontology.baseTypes.includes(selectedNode) ? "Yes ✓" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Connections</span>
                    <span className="text-[#eef0f4]">{getConnected(selectedNode).size}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="font-mono text-[9px] text-[#6b7280] uppercase tracking-widest mb-1.5">Relationships</div>
                  <div className="space-y-1">
                    {getNodeEdges(selectedNode).map((e, i) => (
                      <div key={i} className="font-mono text-[9px] text-[#9ca3af] bg-white/[0.03] rounded px-2 py-1">
                        {e.source === selectedNode
                          ? <span>→ <span className="text-[#f0a500]">[:{e.rel}]</span> :{e.target}</span>
                          : <span>← <span className="text-[#f0a500]">[:{e.rel}]</span> :{e.source}</span>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border-b border-white/5 text-[11px] text-[#4b5563] italic">Click a node to inspect it</div>
            )}

            {/* Cypher Snippets */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="font-mono text-[10px] text-[#6b7280] uppercase tracking-widest mb-2">Cypher Patterns</div>
              {graph.edges.map((edge, i) => <CypherSnippet key={i} edge={edge} />)}
            </div>
          </div>
        </div>
      </div>
    </div>

    {browserUrl && <InAppBrowser url={browserUrl} title={ontology.name + ' Specification'} onClose={() => setBrowserUrl(null)} />}
  </>
  );
}
