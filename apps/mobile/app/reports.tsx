import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Linking } from 'react-native';
import { reports } from '@ng-analytics/shared';

const FREQ_COLORS: Record<string, { bg: string, text: string, border: string }> = {
  Daily: { bg: "rgba(240,165,0,0.15)", text: "#f0a500", border: "rgba(240,165,0,0.4)" },
  Weekly: { bg: "rgba(74,222,128,0.12)", text: "#4ade80", border: "rgba(74,222,128,0.35)" },
  Monthly: { bg: "rgba(96,165,250,0.12)", text: "#60a5fa", border: "rgba(96,165,250,0.35)" },
  Annual: { bg: "rgba(192,132,252,0.12)", text: "#c084fc", border: "rgba(192,132,252,0.35)" },
};

export default function ReportsScreen() {
  const renderItem = ({ item }: { item: typeof reports[0] }) => {
    const freqColor = FREQ_COLORS[item.frequency] || { bg: "#333", text: "#aaa", border: "#555" };

    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed
        ]}
        onPress={() => Linking.openURL(item.url)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={[styles.badge, { backgroundColor: freqColor.bg, borderColor: freqColor.border }]}>
            <Text style={[styles.badgeText, { color: freqColor.text }]}>{item.frequency.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>ACRONYM:</Text>
          <Text style={styles.valueMono}>{item.acronym}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>SCHEDULE:</Text>
          <Text style={styles.value}>{item.releaseDay}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>DATA TYPES:</Text>
          <Text style={styles.value}>{item.dataTypes}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>COVERAGE:</Text>
          <Text style={styles.value}>{item.coverage}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.acronym}
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
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardPressed: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(240,165,0,0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
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
  row: {
    marginBottom: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7280',
    marginBottom: 2,
  },
  value: {
    fontSize: 13,
    color: '#c8cdd8',
    lineHeight: 18,
  },
  valueMono: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
