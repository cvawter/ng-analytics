import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function HubScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Feather name="terminal" size={20} color="#fff" />
        </View>
        <Text style={styles.title}>
          MacroDesk <Text style={styles.titleAccent}>AI Platform</Text>
        </Text>
        <Text style={styles.subtitle}>
          Centralized intelligence, reports catalog, and knowledge graph mapping for natural gas and macroeconomics.
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed
          ]}
          onPress={() => router.push('/reports')}
        >
          <View style={styles.cardIconBox}>
            <Feather name="database" size={24} color="#f0a500" />
          </View>
          <Text style={styles.cardTitle}>Natural Gas Reports</Text>
          <Text style={styles.cardDesc}>
            Explore the complete historical catalog of EIA publications. Access release schedules, data coverage matrices, and underlying statistical types.
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed
          ]}
          onPress={() => router.push('/ontology')}
        >
          <View style={styles.cardIconBox}>
            <Feather name="git-branch" size={24} color="#f0a500" />
          </View>
          <Text style={styles.cardTitle}>Ontology Explorer</Text>
          <Text style={styles.cardDesc}>
            Navigate the cross-domain knowledge graph. Review mappings, approve terms for the curated layer, and trace reasoning paths.
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed
          ]}
          onPress={() => router.push('/chat')}
        >
          <View style={styles.cardIconBox}>
            <Feather name="cpu" size={24} color="#f0a500" />
          </View>
          <Text style={styles.cardTitle}>AI Graph Analyst</Text>
          <Text style={styles.cardDesc}>
            Interact with our GraphRAG backend. Query the knowledge graph using natural language and receive context-aware responses.
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed
          ]}
          onPress={() => router.push('/graph-explorer')}
        >
          <View style={styles.cardIconBox}>
            <Feather name="share-2" size={24} color="#f0a500" />
          </View>
          <Text style={styles.cardTitle}>Graph Visualizer</Text>
          <Text style={styles.cardDesc}>
            Interactive 2D physics graph. Zoom, pan, and drag nodes to explore Neo4j data structures natively on your device.
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f14',
  },
  content: {
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f0a500',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#eef0f4',
    textAlign: 'center',
    marginBottom: 12,
  },
  titleAccent: {
    color: '#f0a500',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  cardsContainer: {
    width: '100%',
    gap: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 24,
  },
  cardPressed: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(240,165,0,0.3)',
  },
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(240,165,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#eef0f4',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: '#9ca3af',
    lineHeight: 20,
  },
});
