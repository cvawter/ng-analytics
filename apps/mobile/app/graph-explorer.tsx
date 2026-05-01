import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { ontologyTerms, relationshipGraph } from '@ng-analytics/shared';

export default function MobileGraphExplorer() {
  // We parse the data in React Native, then stringify it to pass to the WebView
  const nodes = ontologyTerms.map(term => ({
    id: term.name,
    name: term.name,
    val: term.confidence * 10,
    status: term.status,
  }));

  const existingNodeIds = new Set(nodes.map(n => n.id));
  relationshipGraph.forEach(([source, , target]) => {
    if (!existingNodeIds.has(source)) {
      nodes.push({ id: source, name: source, val: 5, status: 'Inferred' });
      existingNodeIds.add(source);
    }
    if (!existingNodeIds.has(target)) {
      nodes.push({ id: target, name: target, val: 5, status: 'Inferred' });
      existingNodeIds.add(target);
    }
  });

  const links = relationshipGraph.map(([source, label, target]) => ({
    source,
    target,
    name: label
  }));

  const graphData = JSON.stringify({ nodes, links });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <script src="https://unpkg.com/force-graph"></script>
        <style>
          body { margin: 0; padding: 0; background-color: #0d0f14; overflow: hidden; }
          #graph { width: 100vw; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="graph"></div>
        <script>
          const data = ${graphData};
          
          const getColor = (status) => {
            switch(status) {
              case 'Curated': return '#34d399';
              case 'Reviewed': return '#60a5fa';
              case 'Proposed': return '#f0a500';
              case 'Mapped': return '#c084fc';
              default: return '#9ca3af';
            }
          };

          const Graph = ForceGraph()(document.getElementById('graph'))
            .graphData(data)
            .nodeLabel('name')
            .nodeColor(node => getColor(node.status))
            .nodeRelSize(6)
            .linkColor(() => 'rgba(255,255,255,0.2)')
            .linkDirectionalArrowLength(3.5)
            .linkDirectionalArrowRelPos(1)
            .linkCurvature(0.25)
            .backgroundColor('#0d0f14')
            .d3VelocityDecay(0.3);

          // Auto-fit after a slight delay to let physics settle
          setTimeout(() => {
            Graph.zoomToFit(400, 50);
          }, 1000);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        scrollEnabled={false}
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f14',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0d0f14',
  }
});
