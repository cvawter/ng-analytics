import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, LayoutAnimation, UIManager, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { energyDemandCompanies } from '@ng-analytics/shared';
import { Feather } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function LegislationScreen() {
  const [search, setSearch] = useState("");
  const [expandedDocket, setExpandedDocket] = useState<string | null>(null);

  const allDockets: any[] = [];
  energyDemandCompanies.forEach((company: any) => {
    if (company.regulatoryActivity) {
      company.regulatoryActivity.forEach((docket: any) => {
        const existing = allDockets.find(d => d.docketId === docket.docketId);
        if (!existing) {
          allDockets.push({
            ...docket,
            impactedCompanies: [company.name]
          });
        } else {
          if (!existing.impactedCompanies.includes(company.name)) {
            existing.impactedCompanies.push(company.name);
          }
        }
      });
    }
  });

  const filteredDockets = allDockets.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) || 
    d.docketId.toLowerCase().includes(search.toLowerCase()) ||
    d.agency.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDocket = (docketId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedDocket(expandedDocket === docketId ? null : docketId);
  };

  const handleOpenLink = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (err) {
      console.error('Failed to open URL:', err);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Feather name="briefcase" size={32} color="#fff" />
        </View>
        <Text style={styles.title}>
          Legislation & <Text style={styles.highlight}>Regulations</Text>
        </Text>
        <Text style={styles.subtitle}>
          Track active dockets, proposed rules, and industry comments impacting AI infrastructure and energy generation.
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#8a94a6" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search dockets, agencies..."
          placeholderTextColor="#6b7280"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.docketsList}>
        {filteredDockets.map((docket, idx) => (
          <View key={idx} style={styles.docketCard}>
            <Pressable 
              style={styles.docketHeader}
              onPress={() => toggleDocket(docket.docketId)}
            >
              <View style={styles.docketHeaderContent}>
                <View style={styles.agencyBadge}>
                  <Text style={styles.agencyText}>{docket.agency}</Text>
                </View>
                <View style={styles.docketHeaderTextContainer}>
                  <Text style={styles.docketTitle}>{docket.title}</Text>
                  <Text style={styles.docketId}>{docket.docketId}</Text>
                  
                  <View style={styles.impactBadge}>
                    <Feather name="target" size={12} color="#8a94a6" />
                    <Text style={styles.impactText}>{docket.impactedCompanies.length} Impacted Companies</Text>
                  </View>
                </View>
              </View>
              <Feather 
                name={expandedDocket === docket.docketId ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#8a94a6" 
              />
            </Pressable>

            {expandedDocket === docket.docketId && (
              <View style={styles.docketContent}>
                {docket.documents && docket.documents.length > 0 && (
                  <View style={styles.subSection}>
                    <Text style={styles.subSectionTitle}>OFFICIAL DOCUMENTS</Text>
                    {docket.documents.map((doc: any, dIdx: number) => (
                      <Pressable 
                        key={dIdx} 
                        style={styles.documentItem}
                        onPress={() => handleOpenLink(doc.url)}
                      >
                        <Feather name="file-text" size={16} color="#8a94a6" />
                        <View style={styles.itemTextContainer}>
                          <Text style={styles.documentItemText}>{doc.title}</Text>
                          <Text style={styles.documentIdText}>{doc.id}</Text>
                        </View>
                        <Feather name="external-link" size={14} color="#6b7280" />
                      </Pressable>
                    ))}
                  </View>
                )}

                {docket.comments && docket.comments.length > 0 && (
                  <View style={[styles.subSection, { marginTop: 16 }]}>
                    <Text style={[styles.subSectionTitle, { color: '#f0a500' }]}>INDUSTRY COMMENTS</Text>
                    {docket.comments.map((com: any, cIdx: number) => (
                      <Pressable 
                        key={cIdx} 
                        style={styles.commentItem}
                        onPress={() => handleOpenLink(com.url)}
                      >
                        <Feather name="message-square" size={16} color="#f0a500" />
                        <View style={styles.itemTextContainer}>
                          <Text style={styles.commentItemText}>{com.title}</Text>
                          <Text style={styles.commentIdText}>{com.id}</Text>
                        </View>
                        <Feather name="external-link" size={14} color="rgba(240, 165, 0, 0.7)" />
                      </Pressable>
                    ))}
                  </View>
                )}
                
                <View style={[styles.subSection, { marginTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 16 }]}>
                  <Text style={styles.subSectionTitle}>IMPACTED COMPANIES</Text>
                  <View style={styles.chipsContainer}>
                    {docket.impactedCompanies.map((companyName: string, cIdx: number) => (
                      <View key={cIdx} style={styles.chip}>
                        <Text style={styles.chipText}>{companyName}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
        
        {filteredDockets.length === 0 && (
          <Text style={styles.noResults}>No regulatory dockets found.</Text>
        )}
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
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#f0a500',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#f0a500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#eef0f4',
    textAlign: 'center',
    marginBottom: 12,
  },
  highlight: {
    color: '#f0a500',
  },
  subtitle: {
    fontSize: 15,
    color: '#8a94a6',
    textAlign: 'center',
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: '#eef0f4',
    fontSize: 15,
  },
  docketsList: {
    gap: 16,
  },
  docketCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  docketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  docketHeaderContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  agencyBadge: {
    backgroundColor: 'rgba(240, 165, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(240, 165, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 16,
    marginTop: 2,
  },
  agencyText: {
    color: '#f0a500',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  docketHeaderTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  docketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#eef0f4',
    marginBottom: 6,
  },
  docketId: {
    fontSize: 12,
    color: '#c8cdd8',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 8,
  },
  impactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  impactText: {
    fontSize: 12,
    color: '#8a94a6',
  },
  docketContent: {
    padding: 20,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  subSection: {
    marginTop: 20,
  },
  subSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8a94a6',
    letterSpacing: 1,
    marginBottom: 12,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  documentItemText: {
    fontSize: 14,
    color: '#c8cdd8',
    fontWeight: '500',
    marginBottom: 2,
  },
  documentIdText: {
    fontSize: 11,
    color: '#6b7280',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 165, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(240, 165, 0, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  commentItemText: {
    fontSize: 14,
    color: '#eef0f4',
    fontWeight: '500',
    marginBottom: 2,
  },
  commentIdText: {
    fontSize: 11,
    color: 'rgba(240, 165, 0, 0.6)',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 13,
    color: '#c8cdd8',
  },
  noResults: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 32,
  }
});
