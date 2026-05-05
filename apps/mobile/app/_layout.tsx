import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0d0f14' },
          headerTintColor: '#eef0f4',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#0d0f14' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'MacroDesk Hub' }} />
        <Stack.Screen name="reports" options={{ title: 'Natural Gas Reports' }} />
        <Stack.Screen name="ontology" options={{ title: 'Ontology Explorer' }} />
        <Stack.Screen name="chat" options={{ title: 'AI Analyst' }} />
        <Stack.Screen name="graph-explorer" options={{ title: 'Graph Visualizer' }} />
        <Stack.Screen name="auto-research" options={{ title: 'Auto Research' }} />
        <Stack.Screen name="markets" options={{ title: 'Market Data' }} />
        <Stack.Screen name="ontology-graph" options={{ title: 'Type Graph' }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
