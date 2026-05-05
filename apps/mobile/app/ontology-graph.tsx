import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Clipboard } from 'react-native';
import Svg, { Circle, Line, Text as SvgText, Defs, Marker, Polygon, G } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { externalOntologies } from '@ng-analytics/shared';
import { useLocalSearchParams } from 'expo-router';

const W = Dimensions.get('window').width - 32;
const H = 320;
const NODE_RADIUS = 26;

const NEO4J_PALETTE = [
  { bg: '#4C8EDA', border: '#2E6BB5', text: '#ffffff' },
  { bg: '#569480', border: '#3D6B5C', text: '#ffffff' },
  { bg: '#F25A29', border: '#C04421', text: '#ffffff' },
  { bg: '#DA7194', border: '#A84E6E', text: '#ffffff' },
  { bg: '#6DCE9E', border: '#4BA070', text: '#1a1a1a' },
  { bg: '#FFD86E', border: '#C9A84C', text: '#1a1a1a' },
  { bg: '#C990C0', border: '#9A6A98', text: '#ffffff' },
  { bg: '#57C7E3', border: '#3A9AB5', text: '#1a1a1a' },
  { bg: '#F79767', border: '#C06A40', text: '#1a1a1a' },
  { bg: '#9BDB89', border: '#6AA858', text: '#1a1a1a' },
];

function buildColorMap(ont: typeof externalOntologies[0]) {
  const map: Record<string, typeof NEO4J_PALETTE[0]> = {};
  let idx = 0;
  ont.baseTypes.forEach((t) => { if (!map[t]) map[t] = NEO4J_PALETTE[idx++ % NEO4J_PALETTE.length]; });
  ont.graphEdges.forEach(({ source, target }) => {
    if (!map[source]) map[source] = NEO4J_PALETTE[idx++ % NEO4J_PALETTE.length];
    if (!map[target]) map[target] = NEO4J_PALETTE[idx++ % NEO4J_PALETTE.length];
  });
  return map;
}

function sanitize(label: string) { return label.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^_+/, ''); }
function genCypher(source: string, rel: string, target: string) {
  return `MATCH (a:${sanitize(source)})-[:${sanitize(rel).toUpperCase()}]->(b:${sanitize(target)})\nRETURN a, b LIMIT 25`;
}

function buildPositions(ont: typeof externalOntologies[0]) {
  const nodeSet = new Set<string>();
  ont.baseTypes.forEach((t) => nodeSet.add(t));
  ont.graphEdges.forEach(({ source, target }) => { nodeSet.add(source); nodeSet.add(target); });
  const nodes = Array.from(nodeSet);
  const count = nodes.length;
  const cx = W / 2, cy = H / 2;
  const radius = Math.min(W, H) / 2 - NODE_RADIUS - 12;
  const pos: Record<string, { x: number; y: number }> = {};
  nodes.forEach((n, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    pos[n] = { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });
  return pos;
}

export default function OntologyGraphScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ont = externalOntologies.find((o) => o.id === id);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => { setSelectedNode(null); }, [id]);

  if (!ont) return <View style={s.container}><Text style={{ color: '#fff', padding: 20 }}>Not found.</Text></View>;

  const positions = buildPositions(ont);
  const colorMap = buildColorMap(ont);

  const getConnected = (nid: string) => {
    const set = new Set<string>();
    ont.graphEdges.forEach(({ source, target }) => {
      if (source === nid) set.add(target);
      if (target === nid) set.add(source);
    });
    return set;
  };
  const connected = selectedNode ? getConnected(selectedNode) : null;

  const getNodeEdges = (nid: string) =>
    ont.graphEdges.filter(({ source, target }) => source === nid || target === nid);

  const handleCopy = (idx: number, cypher: string) => {
    Clipboard.setString(cypher);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      {/* Graph */}
      <View style={s.graphCard}>
        <Svg width={W} height={H}>
          <Defs>
            {NEO4J_PALETTE.map((c, i) => (
              <Marker key={i} id={`arr${i}`} markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                <Polygon points="0 0, 8 3, 0 6" fill={c.bg} />
              </Marker>
            ))}
          </Defs>

          {/* Edges */}
          {ont.graphEdges.map(({ source, target, rel }, i) => {
            const sp = positions[source], tp = positions[target];
            if (!sp || !tp) return null;
            const isLit = selectedNode === source || selectedNode === target;
            const dimmed = selectedNode && !isLit;
            const dx = tp.x - sp.x, dy = tp.y - sp.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const sx2 = sp.x + (dx / dist) * NODE_RADIUS, sy2 = sp.y + (dy / dist) * NODE_RADIUS;
            const ex2 = tp.x - (dx / dist) * (NODE_RADIUS + 8), ey2 = tp.y - (dy / dist) * (NODE_RADIUS + 8);
            const mx = (sp.x + tp.x) / 2, my = (sp.y + tp.y) / 2;
            const srcColor = colorMap[source] || NEO4J_PALETTE[0];
            const pIdx = NEO4J_PALETTE.findIndex(c => c.bg === srcColor.bg);
            return (
              <G key={i} opacity={dimmed ? 0.1 : 1}>
                <Line x1={sx2} y1={sy2} x2={ex2} y2={ey2}
                  stroke={isLit ? srcColor.bg : 'rgba(255,255,255,0.2)'}
                  strokeWidth={isLit ? 2 : 1}
                />
                <SvgText x={mx} y={my - 5} textAnchor="middle" fontSize={7} fill={isLit ? '#eef0f4' : '#6b7280'} fontFamily="Courier">
                  {rel}
                </SvgText>
              </G>
            );
          })}

          {/* Nodes */}
          {Object.entries(positions).map(([nid, pos]) => {
            const color = colorMap[nid] || NEO4J_PALETTE[0];
            const isSel = selectedNode === nid;
            const isConn = connected?.has(nid);
            const dimmed = selectedNode && !isSel && !isConn;
            const label = nid.length > 9 ? nid.slice(0, 8) + '…' : nid;
            return (
              <G key={nid} opacity={dimmed ? 0.12 : 1} onPress={() => setSelectedNode(selectedNode === nid ? null : nid)}>
                {isSel && <Circle cx={pos.x} cy={pos.y} r={NODE_RADIUS + 8} fill={color.bg + '22'} stroke={color.bg} strokeWidth={1} strokeDasharray="3,3" />}
                <Circle cx={pos.x} cy={pos.y} r={NODE_RADIUS} fill={color.bg} stroke={isSel ? '#fff' : color.border} strokeWidth={isSel ? 3 : 1.5} />
                <SvgText x={pos.x} y={pos.y - 4} textAnchor="middle" fontSize={7} fill={color.text + '99'} fontFamily="Courier">:</SvgText>
                <SvgText x={pos.x} y={pos.y + 7} textAnchor="middle" fontSize={8.5} fontWeight="700" fill={color.text} fontFamily="system">{label}</SvgText>
              </G>
            );
          })}
        </Svg>
        <Text style={s.hint}>Tap a node to select · See Cypher below</Text>
      </View>

      {/* Node Legend */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Node Labels</Text>
        <View style={s.legendGrid}>
          {Object.entries(colorMap).map(([label, color]) => (
            <View key={label} style={s.legendItem}>
              <View style={[s.legendDot, { backgroundColor: color.bg, borderColor: color.border }]} />
              <Text style={s.legendLabel} numberOfLines={1}>:{label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Selected Node Detail */}
      {selectedNode && (
        <View style={[s.section, { borderColor: (colorMap[selectedNode]?.bg || '#f0a500') + '44' }]}>
          <View style={s.selectedHeader}>
            <View style={[s.selectedDot, { backgroundColor: colorMap[selectedNode]?.bg }]} />
            <Text style={[s.selectedName, { color: colorMap[selectedNode]?.bg }]}>:{selectedNode}</Text>
          </View>
          <View style={s.selectedMeta}>
            <Text style={s.metaKey}>Base Type</Text>
            <Text style={[s.metaVal, { color: ont.baseTypes.includes(selectedNode) ? '#6DCE9E' : '#6b7280' }]}>
              {ont.baseTypes.includes(selectedNode) ? 'Yes ✓' : 'No'}
            </Text>
          </View>
          <View style={s.selectedMeta}>
            <Text style={s.metaKey}>Connections</Text>
            <Text style={s.metaVal}>{getConnected(selectedNode).size}</Text>
          </View>
          <Text style={[s.sectionTitle, { marginTop: 10 }]}>Relationships</Text>
          {getNodeEdges(selectedNode).map((e, i) => (
            <View key={i} style={s.relRow}>
              <Text style={s.relText}>
                {e.source === selectedNode
                  ? `→ [:${e.rel}] :${e.target}`
                  : `← [:${e.rel}] :${e.source}`}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Cypher Patterns */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Cypher Patterns</Text>
        {ont.graphEdges.map(({ source, rel, target }, i) => {
          const cypher = genCypher(source, rel, target);
          return (
            <View key={i} style={s.cypherCard}>
              <Text style={s.cypherText}>{cypher}</Text>
              <Pressable style={s.copyBtn} onPress={() => handleCopy(i, cypher)}>
                <Feather name={copiedIdx === i ? 'check' : 'copy'} size={13} color={copiedIdx === i ? '#6DCE9E' : '#6b7280'} />
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0f14' },
  content: { padding: 16, paddingBottom: 60 },
  graphCard: {
    backgroundColor: '#070a0f', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20, overflow: 'hidden', marginBottom: 14, alignItems: 'center',
  },
  hint: { color: '#4b5563', fontSize: 10, paddingVertical: 8, fontFamily: 'Courier' },
  section: {
    backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, marginBottom: 14,
  },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },
  legendGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5, width: '45%' },
  legendDot: { width: 10, height: 10, borderRadius: 5, borderWidth: 1.5 },
  legendLabel: { fontSize: 11, color: '#c8cdd8', fontFamily: 'Courier', flex: 1 },
  selectedHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  selectedDot: { width: 14, height: 14, borderRadius: 7 },
  selectedName: { fontSize: 16, fontWeight: '700', fontFamily: 'Courier' },
  selectedMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  metaKey: { fontSize: 12, color: '#6b7280' },
  metaVal: { fontSize: 12, color: '#eef0f4', fontWeight: '600' },
  relRow: {
    backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6, marginBottom: 4,
  },
  relText: { fontSize: 11, color: '#9ca3af', fontFamily: 'Courier' },
  cypherCard: {
    backgroundColor: '#070a0f', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'flex-start', gap: 10,
  },
  cypherText: { flex: 1, fontFamily: 'Courier', fontSize: 11, color: '#c8cdd8', lineHeight: 18 },
  copyBtn: { padding: 4, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
});
