import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, LayoutAnimation, UIManager, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { energyDemandCompanies } from '@ng-analytics/shared';
import { Feather } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CompanyDetailScreen() {
  const { id } = useLocalSearchParams();
  const company = energyDemandCompanies.find(c => c.id === id);
  const [expandedDocket, setExpandedDocket] = useState<string | null>(null);

  if (!company) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Company not found</Text>
      </View>
    );
  }

  const handleOpenLink = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (err) {
      console.error('Failed to open URL:', err);
    }
  };

  const toggleDocket = (docketId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedDocket(expandedDocket === docketId ? null : docketId);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{company.name}</Text>
        <View style={styles.tickerBadge}>
          <Text style={styles.tickerText}>{company.ticker}</Text>
        </View>
      </View>

      <View style={styles.typeBadge}>
        <Text style={styles.typeText}>{company.type.toUpperCase()}</Text>
      </View>

      <View style={styles.metaContainer}>
        <View style={styles.metaBox}>
          <Feather name="map-pin" size={14} color="#6b7280" style={styles.metaIcon} />
          <Text style={styles.metaLabel}>HEADQUARTERS</Text>
          <Text style={styles.metaValue}>{company.headquarters}</Text>
        </View>
        <View style={styles.metaBox}>
          <Feather name="dollar-sign" size={14} color="#6b7280" style={styles.metaIcon} />
          <Text style={styles.metaLabel}>MARKET CAP</Text>
          <Text style={styles.metaValue}>{company.marketCap}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WHY IT MATTERS FOR AI</Text>
        <Text style={styles.description}>{company.description}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable 
          style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
          onPress={() => handleOpenLink(company.news_url)}
        >
          <Feather name="rss" size={20} color="#000" style={styles.btnIcon} />
          <Text style={styles.primaryButtonText}>Live News Feed</Text>
          <Feather name="external-link" size={16} color="#000" style={{ opacity: 0.7 }} />
        </Pressable>

        <Pressable 
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
          onPress={() => handleOpenLink(company.sec10k_url)}
        >
          <Feather name="file-text" size={20} color="#fff" style={styles.btnIcon} />
          <Text style={styles.secondaryButtonText}>Latest SEC 10-K</Text>
          <Feather name="external-link" size={16} color="#fff" style={{ opacity: 0.7 }} />
        </Pressable>
      </View>

      {company.regulatoryActivity && company.regulatoryActivity.length > 0 && (
        <View style={styles.regulatorySection}>
          <View style={styles.regulatoryHeader}>
            <Feather name="briefcase" size={20} color="#8a94a6" />
            <Text style={styles.regulatoryTitle}>Regulatory Activity</Text>
          </View>
          
          <View style={styles.docketsContainer}>
            {company.regulatoryActivity.map((docket: any, idx: number) => (
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
                        <Text style={styles.subSectionTitle}>DOCUMENTS</Text>
                        {docket.documents.map((doc: any, dIdx: number) => (
                          <Pressable 
                            key={dIdx} 
                            style={styles.documentItem}
                            onPress={() => handleOpenLink(doc.url)}
                          >
                            <Feather name="file-text" size={16} color="#8a94a6" />
                            <Text style={styles.documentItemText}>{doc.title}</Text>
                            <Feather name="external-link" size={14} color="#6b7280" />
                          </Pressable>
                        ))}
                      </View>
                    )}

                    {docket.comments && docket.comments.length > 0 && (
                      <View style={[styles.subSection, { marginTop: 12 }]}>
                        <Text style={styles.subSectionTitle}>COMPANY COMMENTS</Text>
                        {docket.comments.map((com: any, cIdx: number) => (
                          <Pressable 
                            key={cIdx} 
                            style={styles.commentItem}
                            onPress={() => handleOpenLink(com.url)}
                          >
                            <Feather name="message-square" size={16} color="#f0a500" />
                            <Text style={styles.commentItemText}>{com.title}</Text>
                            <Feather name="external-link" size={14} color="rgba(240, 165, 0, 0.7)" />
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f14',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#eef0f4',
  },
  tickerBadge: {
    backgroundColor: 'rgba(240, 165, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(240, 165, 0, 0.3)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tickerText: {
    color: '#f0a500',
    fontSize: 14,
    fontWeight: 'bold',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 24,
  },
  typeText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  metaBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  metaIcon: {
    marginBottom: 8,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 14,
    color: '#eef0f4',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8a94a6',
    marginBottom: 8,
    letterSpacing: 1,
  },
  description: {
    fontSize: 15,
    color: '#c8cdd8',
    lineHeight: 22,
  },
  actions: {
    gap: 12,
    marginTop: 'auto',
  },
  primaryButton: {
    backgroundColor: '#f0a500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  btnIcon: {
    marginRight: 8,
  },
  regulatorySection: {
    padding: 24,
    paddingTop: 0,
  },
  regulatoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  regulatoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8a94a6',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 8,
  },
  docketsContainer: {
    gap: 12,
  },
  docketCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  docketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  docketHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  agencyBadge: {
    backgroundColor: 'rgba(240, 165, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(240, 165, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  agencyText: {
    color: '#f0a500',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  docketHeaderTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  docketTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#eef0f4',
    marginBottom: 4,
  },
  docketId: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  docketContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  subSection: {
    marginTop: 16,
  },
  subSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6b7280',
    letterSpacing: 1,
    marginBottom: 8,
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
  documentItemText: {
    flex: 1,
    fontSize: 13,
    color: '#c8cdd8',
    marginLeft: 8,
    marginRight: 8,
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
    flex: 1,
    fontSize: 13,
    color: '#eef0f4',
    marginLeft: 8,
    marginRight: 8,
  },
});
