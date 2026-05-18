import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { energyDemandCompanies } from '@ng-analytics/shared';

export default function CompaniesScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof energyDemandCompanies[0] }) => {
    return (
      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => router.push(`/companies/${item.id}` as any)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>WHY IT MATTERS:</Text>
          <Text style={styles.value}>{item.description}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={energyDemandCompanies}
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
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.7,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
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
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9ca3af',
  },
  row: {
    marginTop: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 13,
    color: '#c8cdd8',
    lineHeight: 18,
  },
});
