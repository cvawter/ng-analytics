import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TextInput, Pressable, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ontologyTerms, externalOntologies, ontologyCategories } from '@ng-analytics/shared';
import { router } from 'expo-router';

const STATUS_COLORS: Record<string, { bg: string, text: string, border: string }> = {
  Curated: { bg: "rgba(52,211,153,0.1)", text: "#34d399", border: "rgba(52,211,153,0.3)" },
  Reviewed: { bg: "rgba(96,165,250,0.1)", text: "#60a5fa", border: "rgba(96,165,250,0.3)" },
  Proposed: { bg: "rgba(240,165,0,0.1)", text: "#f0a500", border: "rgba(240,165,0,0.3)" },
  Mapped: { bg: "rgba(192,132,252,0.1)", text: "#c084fc", border: "rgba(192,132,252,0.3)" },
};

const CATEGORY_COLORS: Record<string, { bg: string, text: string, border: string }> = {
  "Energy": { bg: "rgba(52,211,153,0.1)", text: "#34d399", border: "rgba(52,211,153,0.3)" },
  "Finance & Trading": { bg: "rgba(96,165,250,0.1)", text: "#60a5fa", border: "rgba(96,165,250,0.3)" },
  "Provenance": { bg: "rgba(192,132,252,0.1)", text: "#c084fc", border: "rgba(192,132,252,0.3)" },
  "Measurement": { bg: "rgba(240,165,0,0.1)", text: "#f0a500", border: "rgba(240,165,0,0.3)" },
  "Geospatial": { bg: "rgba(34,211,238,0.1)", text: "#22d3ee", border: "rgba(34,211,238,0.3)" },
  "Temporal": { bg: "rgba(251,113,133,0.1)", text: "#fb7185", border: "rgba(251,113,133,0.3)" },
  "Knowledge Organization": { bg: "rgba(167,139,250,0.1)", text: "#a78bfa", border: "rgba(167,139,250,0.3)" },
  "Metadata": { bg: "rgba(148,163,184,0.1)", text: "#94a3b8", border: "rgba(148,163,184,0.3)" },
  "Energy Grid": { bg: "rgba(163,230,53,0.1)", text: "#a3e635", border: "rgba(163,230,53,0.3)" },
  "Upper / Foundational": { bg: "rgba(99,102,241,0.1)", text: "#6366f1", border: "rgba(99,102,241,0.3)" },
  "General Purpose": { bg: "rgba(251,191,36,0.1)", text: "#fbbf24", border: "rgba(251,191,36,0.3)" },
};

type TabType = 'terms' | 'library';

export default function OntologyScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('terms');
  const [extCategory, setExtCategory] = useState('All');
  const [extSearch, setExtSearch] = useState('');

  const filteredOntologies = externalOntologies.filter((ont) => {
    const q = extSearch.toLowerCase();
    const matchesSearch = !q ||
      ont.name.toLowerCase().includes(q) ||
      ont.fullName.toLowerCase().includes(q) ||
      ont.relevance.toLowerCase().includes(q) ||
      ont.usage.toLowerCase().includes(q) ||
      ont.baseTypes.join(' ').toLowerCase().includes(q);
    const matchesCat = extCategory === 'All' || ont.category === extCategory;
    return matchesSearch && matchesCat;
  });

  const renderTermItem = ({ item }: { item: typeof ontologyTerms[0] }) => {
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

  const renderOntologyCard = (ont: typeof externalOntologies[0]) => {
    const catColor = CATEGORY_COLORS[ont.category] || { bg: "rgba(255,255,255,0.05)", text: "#9ca3af", border: "rgba(255,255,255,0.1)" };
    return (
      <View key={ont.id} style={styles.extCard}>
        <View style={styles.extCardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.extCardName}>{ont.name}</Text>
            <Text style={styles.extCardNs}>{ont.namespace}</Text>
          </View>
          <View style={styles.extCardRight}>
            <View style={[styles.catBadge, { backgroundColor: catColor.bg, borderColor: catColor.border }]}>
              <Text style={[styles.catBadgeText, { color: catColor.text }]}>{ont.category}</Text>
            </View>
            <Pressable onPress={() => Linking.openURL(ont.url)}>
              <Feather name="external-link" size={14} color="#6b7280" />
            </Pressable>
          </View>
        </View>

        <Text style={styles.extCardFullName}>{ont.fullName}</Text>

        <View style={styles.baseTypesSection}>
          <Text style={styles.baseTypesLabel}>BASE TYPES</Text>
          <View style={styles.baseTypesList}>
            {ont.baseTypes.map((t) => (
              <View key={t} style={styles.baseTypeTag}>
                <Text style={styles.baseTypeText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.relevanceText}>
          <Text style={styles.relevanceLabel}>Relevance: </Text>{ont.relevance}
        </Text>

        <View style={styles.usageBox}>
          <Text style={styles.usageText}>
            <Text style={styles.usageLabel}>USAGE → </Text>{ont.usage}
          </Text>
        </View>

        <Pressable
          style={styles.exploreBtn}
          onPress={() => router.push({ pathname: '/ontology-graph', params: { id: ont.id } })}
        >
          <Feather name="git-merge" size={13} color="#f0a500" />
          <Text style={styles.exploreBtnText}>Explore Type Graph</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, activeTab === 'terms' && styles.tabActive]}
          onPress={() => setActiveTab('terms')}
        >
          <Feather name="list" size={14} color={activeTab === 'terms' ? '#f0a500' : '#6b7280'} />
          <Text style={[styles.tabText, activeTab === 'terms' && styles.tabTextActive]}>Term Catalog</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'library' && styles.tabActive]}
          onPress={() => setActiveTab('library')}
        >
          <Feather name="book-open" size={14} color={activeTab === 'library' ? '#f0a500' : '#6b7280'} />
          <Text style={[styles.tabText, activeTab === 'library' && styles.tabTextActive]}>Ontology Library</Text>
        </Pressable>
      </View>

      {/* Term Catalog Tab */}
      {activeTab === 'terms' && (
        <FlatList
          data={ontologyTerms}
          keyExtractor={(item) => item.id}
          renderItem={renderTermItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Ontology Library Tab */}
      {activeTab === 'library' && (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          <View style={styles.libHeader}>
            <Feather name="book" size={18} color="#f0a500" />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.libTitle}>Industry Ontology Reference Library</Text>
              <Text style={styles.libSubtitle}>Third-party ontologies for abstract base types in the NG Macroeconomics Graph.</Text>
            </View>
          </View>

          {/* Search */}
          <View style={styles.searchBox}>
            <Feather name="search" size={14} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              value={extSearch}
              onChangeText={setExtSearch}
              placeholder="Search ontologies, base types..."
              placeholderTextColor="#6b7280"
            />
          </View>

          {/* Category filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ gap: 8, paddingHorizontal: 2 }}>
            {ontologyCategories.map((cat) => (
              <Pressable
                key={cat}
                style={[styles.filterChip, extCategory === cat && styles.filterChipActive]}
                onPress={() => setExtCategory(cat)}
              >
                <Text style={[styles.filterChipText, extCategory === cat && styles.filterChipTextActive]}>{cat}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Cards */}
          <View style={{ marginTop: 16 }}>
            {filteredOntologies.map(renderOntologyCard)}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0f14' },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  tabActive: { backgroundColor: 'rgba(240,165,0,0.1)', borderBottomWidth: 2, borderBottomColor: '#f0a500' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#6b7280' },
  tabTextActive: { color: '#f0a500' },
  listContent: { padding: 16, paddingBottom: 40 },
  // Term cards
  card: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16, padding: 20, marginBottom: 16,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  cardTitle: { flex: 1, fontSize: 18, fontWeight: '700', color: '#eef0f4', marginRight: 12 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  domainText: { fontSize: 12, color: '#9ca3af', marginBottom: 12 },
  definitionText: { fontSize: 14, color: '#c8cdd8', lineHeight: 22, marginBottom: 16 },
  statsContainer: { flexDirection: 'row', gap: 12 },
  statBox: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 10, alignItems: 'center',
  },
  statLabel: { fontSize: 9, fontWeight: '700', color: '#6b7280', marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#f0a500' },
  // Library section
  libHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  libTitle: { fontSize: 16, fontWeight: '700', color: '#eef0f4' },
  libSubtitle: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10,
    marginBottom: 12,
  },
  searchInput: { flex: 1, fontSize: 13, color: '#eef0f4' },
  filterScroll: { marginBottom: 4 },
  filterChip: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 8, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  filterChipActive: { backgroundColor: 'rgba(240,165,0,0.15)', borderColor: 'rgba(240,165,0,0.4)' },
  filterChipText: { fontSize: 11, fontWeight: '700', color: '#6b7280' },
  filterChipTextActive: { color: '#f0a500' },
  // External ontology cards
  extCard: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16, padding: 18, marginBottom: 16,
  },
  extCardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  extCardName: { fontSize: 16, fontWeight: '700', color: '#eef0f4' },
  extCardNs: { fontSize: 11, color: '#6b7280', marginTop: 2 },
  extCardRight: { alignItems: 'flex-end', gap: 8 },
  catBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1 },
  catBadgeText: { fontSize: 9, fontWeight: '700' },
  extCardFullName: { fontSize: 11, color: '#6b7280', fontStyle: 'italic', marginBottom: 12 },
  baseTypesSection: { marginBottom: 12 },
  baseTypesLabel: { fontSize: 10, fontWeight: '700', color: '#f0a500', marginBottom: 6 },
  baseTypesList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  baseTypeTag: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
  },
  baseTypeText: { fontSize: 10, color: '#c8cdd8' },
  relevanceText: { fontSize: 12, color: '#9ca3af', lineHeight: 18, marginBottom: 10 },
  relevanceLabel: { fontWeight: '600', color: '#c8cdd8' },
  usageBox: {
    backgroundColor: 'rgba(240,165,0,0.05)',
    borderWidth: 1, borderColor: 'rgba(240,165,0,0.15)',
    borderRadius: 10, padding: 10,
  },
  usageText: { fontSize: 11, color: '#c8cdd8', lineHeight: 17 },
  usageLabel: { fontWeight: '700', color: '#f0a500' },
  exploreBtn: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(240,165,0,0.25)',
    backgroundColor: 'rgba(240,165,0,0.07)',
    borderRadius: 10,
    paddingVertical: 10,
  },
  exploreBtnText: {
    color: '#f0a500',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
