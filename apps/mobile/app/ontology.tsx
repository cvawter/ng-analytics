import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { ontologyTerms } from '@ng-analytics/shared';

const STATUS_COLORS: Record<string, { bg: string, text: string, border: string }> = {
  Curated: { bg: "rgba(52,211,153,0.1)", text: "#34d399", border: "rgba(52,211,153,0.3)" },
  Reviewed: { bg: "rgba(96,165,250,0.1)", text: "#60a5fa", border: "rgba(96,165,250,0.3)" },
  Proposed: { bg: "rgba(240,165,0,0.1)", text: "#f0a500", border: "rgba(240,165,0,0.3)" },
  Mapped: { bg: "rgba(192,132,252,0.1)", text: "#c084fc", border: "rgba(192,132,252,0.3)" },
};

export default function OntologyScreen() {
  const renderItem = ({ item }: { item: typeof ontologyTerms[0] }) => {
    const statusColor = STATUS_COLORS[item.status] || { bg: "#333", text: "#aaa", border: "#555" };

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={[styles.badge, { backgroundColor: statusColor.bg, borderColor: statusColor.border }]}>
            <Text style={[styles.badgeText, { color: statusColor.text }]}>{item.status.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.domainText}>{item.domain}</Text>
        
        <Text style={styles.definitionText}>{item.definition}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>CONFIDENCE</Text>
            <Text style={styles.statValue}>{Math.round(item.confidence * 100)}%</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>MAPPINGS</Text>
            <Text style={styles.statValue}>{item.mappedTo.length}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>SOURCES</Text>
            <Text style={styles.statValue}>{item.sources.length}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ontologyTerms}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f14',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#eef0f4',
    marginRight: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  domainText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 12,
    fontFamily: 'Courier', 
  },
  definitionText: {
    fontSize: 14,
    color: '#c8cdd8',
    lineHeight: 22,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f0a500',
  },
});
