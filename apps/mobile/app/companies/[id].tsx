import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, LayoutAnimation, UIManager, Platform, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { energyDemandCompanies, generateStockHistory, generateOptionChain, TICKER_BASE_PRICES } from '@ng-analytics/shared';
import { Feather } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const TABS = ['Overview', 'Stock', 'Options', 'Regulatory'] as const;
type TabType = typeof TABS[number];

export default function CompanyDetailScreen() {
  const { id } = useLocalSearchParams();
  const company = energyDemandCompanies.find((c: any) => c.id === id);
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const [expandedDocket, setExpandedDocket] = useState<string | null>(null);
  const [selectedExpIdx, setSelectedExpIdx] = useState(0);

  const basePrice: number = company ? ((TICKER_BASE_PRICES as Record<string, number>)[company.ticker] ?? 50) : 50;
  const stockHistory = useMemo(() => company ? generateStockHistory(company.ticker, basePrice) : [], [company?.ticker, basePrice]);
  const optionChain = useMemo(() => company ? generateOptionChain(company.ticker, basePrice) : [], [company?.ticker, basePrice]);

  if (!company) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Company not found</Text>
      </View>
    );
  }

  const handleOpenLink = async (url: string) => {
    try { await WebBrowser.openBrowserAsync(url); } catch (err) { console.error(err); }
  };

  const toggleDocket = (docketId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedDocket(expandedDocket === docketId ? null : docketId);
  };

  // Stock data for chart
  const chartLabels = stockHistory.filter((_: any, i: number) => i % 5 === 0).map((d: any) => d.date);
  const chartData = stockHistory.map((d: any) => d.price);
  const firstPrice = chartData[0] ?? basePrice;
  const lastPrice = chartData[chartData.length - 1] ?? basePrice;
  const priceChange = lastPrice - firstPrice;
  const pricePct = ((priceChange / firstPrice) * 100).toFixed(2);
  const isUp = priceChange >= 0;

  // Options chain
  const currentChain = optionChain[selectedExpIdx];
  const atmStrike = currentChain?.strikes[Math.floor((currentChain?.strikes.length ?? 0) / 2)]?.strike;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{company.name}</Text>
        <View style={styles.tickerBadge}>
          <Text style={styles.tickerText}>{company.ticker}</Text>
        </View>
      </View>
      <View style={styles.typeBadge}>
        <Text style={styles.typeText}>{company.type.toUpperCase()}</Text>
      </View>

      {/* Tab Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={styles.tabBarContent}>
        {TABS.map(t => (
          <Pressable key={t} onPress={() => setActiveTab(t)} style={[styles.tab, activeTab === t && styles.tabActive]}>
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Overview Tab */}
      {activeTab === 'Overview' && (
        <View>
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
            <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]} onPress={() => handleOpenLink(company.news_url)}>
              <Feather name="rss" size={20} color="#000" style={styles.btnIcon} />
              <Text style={styles.primaryButtonText}>Live News Feed</Text>
              <Feather name="external-link" size={16} color="#000" style={{ opacity: 0.7 }} />
            </Pressable>
            <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]} onPress={() => handleOpenLink(company.sec10k_url)}>
              <Feather name="file-text" size={20} color="#fff" style={styles.btnIcon} />
              <Text style={styles.secondaryButtonText}>Latest SEC 10-K</Text>
              <Feather name="external-link" size={16} color="#fff" style={{ opacity: 0.7 }} />
            </Pressable>
          </View>
        </View>
      )}

      {/* Stock Chart Tab */}
      {activeTab === 'Stock' && (
        <View style={styles.section}>
          <View style={styles.priceHeader}>
            <View>
              <Text style={styles.priceTicker}>{company.ticker} · 30-Day</Text>
              <Text style={styles.priceValue}>${lastPrice.toFixed(2)}</Text>
            </View>
            <View style={[styles.changeBadge, { backgroundColor: isUp ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)' }]}>
              <Feather name={isUp ? 'trending-up' : 'trending-down'} size={14} color={isUp ? '#10b981' : '#ef4444'} />
              <Text style={[styles.changeText, { color: isUp ? '#10b981' : '#ef4444' }]}>
                {isUp ? '+' : ''}{priceChange.toFixed(2)} ({isUp ? '+' : ''}{pricePct}%)
              </Text>
            </View>
          </View>
          {chartData.length > 0 && (
            <LineChart
              data={{ labels: chartLabels, datasets: [{ data: chartData, color: () => isUp ? '#10b981' : '#ef4444', strokeWidth: 2 }] }}
              width={SCREEN_WIDTH - 48}
              height={180}
              withDots={false}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              chartConfig={{
                backgroundColor: 'transparent',
                backgroundGradientFrom: '#13161f',
                backgroundGradientTo: '#13161f',
                decimalPlaces: 0,
                color: () => isUp ? '#10b981' : '#ef4444',
                labelColor: () => '#6b7280',
                propsForLabels: { fontSize: 9 },
                fillShadowGradientFrom: isUp ? '#10b981' : '#ef4444',
                fillShadowGradientFromOpacity: 0.2,
                fillShadowGradientToOpacity: 0,
              }}
              bezier
              style={styles.chart}
            />
          )}
          <Text style={styles.disclaimer}>Simulated data · Educational purposes only</Text>
        </View>
      )}

      {/* Options Tab */}
      {activeTab === 'Options' && currentChain && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OPTIONS CHAIN · {company.ticker}</Text>
          {/* Expiration selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            {optionChain.map((c: any, i: number) => (
              <Pressable key={c.expiration} onPress={() => setSelectedExpIdx(i)}
                style={[styles.expButton, i === selectedExpIdx && styles.expButtonActive]}>
                <Text style={[styles.expButtonText, i === selectedExpIdx && styles.expButtonTextActive]}>{c.expiration}</Text>
              </Pressable>
            ))}
          </ScrollView>
          {/* Column Headers */}
          <View style={styles.optRow}>
            <Text style={[styles.optHeader, { flex: 1.2 }]}>CALL</Text>
            <Text style={[styles.optHeader, { flex: 1, textAlign: 'center' }]}>STRIKE</Text>
            <Text style={[styles.optHeader, { flex: 1.2, textAlign: 'right' }]}>PUT</Text>
          </View>
          {currentChain.strikes.map((row: any) => {
            const isATM = row.strike === atmStrike;
            return (
              <View key={row.strike} style={[styles.optRow, isATM && styles.optRowATM]}>
                <View style={{ flex: 1.2 }}>
                  <Text style={styles.callBid}>{row.call.bid.toFixed(2)}</Text>
                  <Text style={styles.callAsk}>{row.call.ask.toFixed(2)}</Text>
                  <Text style={styles.ivText}>IV {row.call.iv}%</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={[styles.strikeText, isATM && { color: '#f0a500' }]}>${row.strike}</Text>
                  {isATM && <Text style={styles.atmBadge}>ATM</Text>}
                </View>
                <View style={{ flex: 1.2, alignItems: 'flex-end' }}>
                  <Text style={styles.putBid}>{row.put.bid.toFixed(2)}</Text>
                  <Text style={styles.putAsk}>{row.put.ask.toFixed(2)}</Text>
                  <Text style={styles.ivText}>IV {row.put.iv}%</Text>
                </View>
              </View>
            );
          })}
          <Text style={styles.disclaimer}>Simulated data · Educational purposes only</Text>
        </View>
      )}

      {/* Regulatory Tab */}
      {activeTab === 'Regulatory' && (
        <View style={styles.regulatorySection}>
          <View style={styles.regulatoryHeader}>
            <Feather name="briefcase" size={20} color="#8a94a6" />
            <Text style={styles.regulatoryTitle}>Regulatory Activity</Text>
          </View>
          {(company.regulatoryActivity?.length ?? 0) === 0 && (
            <Text style={{ color: '#6b7280', textAlign: 'center', padding: 32 }}>No regulatory activity on record.</Text>
          )}
          <View style={styles.docketsContainer}>
            {(company.regulatoryActivity ?? []).map((docket: any, idx: number) => (
              <View key={idx} style={styles.docketCard}>
                <Pressable style={styles.docketHeader} onPress={() => toggleDocket(docket.docketId)}>
                  <View style={styles.docketHeaderContent}>
                    <View style={styles.agencyBadge}><Text style={styles.agencyText}>{docket.agency}</Text></View>
                    <View style={styles.docketHeaderTextContainer}>
                      <Text style={styles.docketTitle}>{docket.title}</Text>
                      <Text style={styles.docketId}>{docket.docketId}</Text>
                    </View>
                  </View>
                  <Feather name={expandedDocket === docket.docketId ? 'chevron-up' : 'chevron-down'} size={20} color="#8a94a6" />
                </Pressable>
                {expandedDocket === docket.docketId && (
                  <View style={styles.docketContent}>
                    {docket.documents?.length > 0 && (
                      <View style={styles.subSection}>
                        <Text style={styles.subSectionTitle}>DOCUMENTS</Text>
                        {docket.documents.map((doc: any, dIdx: number) => (
                          <Pressable key={dIdx} style={styles.documentItem} onPress={() => handleOpenLink(doc.url)}>
                            <Feather name="file-text" size={16} color="#8a94a6" />
                            <Text style={styles.documentItemText}>{doc.title}</Text>
                            <Feather name="external-link" size={14} color="#6b7280" />
                          </Pressable>
                        ))}
                      </View>
                    )}
                    {docket.comments?.length > 0 && (
                      <View style={[styles.subSection, { marginTop: 12 }]}>
                        <Text style={styles.subSectionTitle}>COMPANY COMMENTS</Text>
                        {docket.comments.map((com: any, cIdx: number) => (
                          <Pressable key={cIdx} style={styles.commentItem} onPress={() => handleOpenLink(com.url)}>
                            <Feather name="message-square" size={16} color="#f0a500" />
                            <Text style={styles.commentItemText}>{com.title}</Text>
                            <Feather name="external-link" size={14} color="rgba(240,165,0,0.7)" />
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
  container: { flex: 1, backgroundColor: '#0d0f14' },
  content: { padding: 20, paddingBottom: 40 },
  errorText: { color: '#ff4444', fontSize: 16, textAlign: 'center', marginTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', color: '#eef0f4', flex: 1 },
  tickerBadge: { backgroundColor: 'rgba(240,165,0,0.1)', borderWidth: 1, borderColor: 'rgba(240,165,0,0.3)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  tickerText: { color: '#f0a500', fontSize: 14, fontWeight: 'bold' },
  typeBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 16 },
  typeText: { color: '#9ca3af', fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5 },
  tabBar: { marginBottom: 20 },
  tabBarContent: { gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  tabActive: { backgroundColor: 'rgba(240,165,0,0.15)', borderColor: 'rgba(240,165,0,0.4)' },
  tabText: { color: '#6b7280', fontSize: 12, fontWeight: 'bold' },
  tabTextActive: { color: '#f0a500' },
  metaContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  metaBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16 },
  metaIcon: { marginBottom: 8 },
  metaLabel: { fontSize: 10, fontWeight: 'bold', color: '#6b7280', marginBottom: 4, letterSpacing: 0.5 },
  metaValue: { fontSize: 14, color: '#eef0f4' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#8a94a6', marginBottom: 12, letterSpacing: 1 },
  description: { fontSize: 15, color: '#c8cdd8', lineHeight: 22 },
  actions: { gap: 12 },
  primaryButton: { backgroundColor: '#f0a500', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12, gap: 8 },
  primaryButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12, gap: 8 },
  secondaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  buttonPressed: { opacity: 0.8 },
  btnIcon: { marginRight: 4 },
  // Stock
  priceHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 },
  priceTicker: { fontSize: 11, color: '#8a94a6', letterSpacing: 1, marginBottom: 4 },
  priceValue: { fontSize: 32, fontWeight: 'bold', color: '#eef0f4' },
  changeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginTop: 8 },
  changeText: { fontSize: 13, fontWeight: 'bold' },
  chart: { borderRadius: 12, marginLeft: -8 },
  disclaimer: { fontSize: 10, color: '#6b7280', textAlign: 'center', marginTop: 12 },
  // Options
  expButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginRight: 8 },
  expButtonActive: { backgroundColor: 'rgba(240,165,0,0.15)', borderColor: 'rgba(240,165,0,0.4)' },
  expButtonText: { color: '#8a94a6', fontSize: 12, fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  expButtonTextActive: { color: '#f0a500' },
  optRow: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  optRowATM: { backgroundColor: 'rgba(240,165,0,0.05)', borderColor: 'rgba(240,165,0,0.2)' },
  optHeader: { fontSize: 10, fontWeight: 'bold', color: '#6b7280', letterSpacing: 0.5 },
  callBid: { fontSize: 13, color: '#10b981', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold' },
  callAsk: { fontSize: 11, color: 'rgba(16,185,129,0.6)', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  putBid: { fontSize: 13, color: '#ef4444', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold', textAlign: 'right' },
  putAsk: { fontSize: 11, color: 'rgba(239,68,68,0.6)', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', textAlign: 'right' },
  strikeText: { fontSize: 14, fontWeight: 'bold', color: '#eef0f4', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  atmBadge: { fontSize: 9, color: '#f0a500', backgroundColor: 'rgba(240,165,0,0.15)', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3, marginTop: 2 },
  ivText: { fontSize: 10, color: '#6b7280', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginTop: 2 },
  // Regulatory (unchanged)
  regulatorySection: { paddingTop: 0 },
  regulatoryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  regulatoryTitle: { fontSize: 14, fontWeight: 'bold', color: '#8a94a6', textTransform: 'uppercase', letterSpacing: 1, marginLeft: 8 },
  docketsContainer: { gap: 12 },
  docketCard: { backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', overflow: 'hidden' },
  docketHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  docketHeaderContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  agencyBadge: { backgroundColor: 'rgba(240,165,0,0.1)', borderWidth: 1, borderColor: 'rgba(240,165,0,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginRight: 12 },
  agencyText: { color: '#f0a500', fontSize: 10, fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  docketHeaderTextContainer: { flex: 1, paddingRight: 16 },
  docketTitle: { fontSize: 14, fontWeight: 'bold', color: '#eef0f4', marginBottom: 4 },
  docketId: { fontSize: 12, color: '#6b7280', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  docketContent: { padding: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,0,0,0.2)' },
  subSection: { marginTop: 8 },
  subSectionTitle: { fontSize: 10, fontWeight: 'bold', color: '#6b7280', letterSpacing: 1, marginBottom: 8 },
  documentItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 12, marginBottom: 8 },
  documentItemText: { flex: 1, fontSize: 13, color: '#c8cdd8', marginLeft: 8, marginRight: 8 },
  commentItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(240,165,0,0.05)', borderWidth: 1, borderColor: 'rgba(240,165,0,0.1)', borderRadius: 8, padding: 12, marginBottom: 8 },
  commentItemText: { flex: 1, fontSize: 13, color: '#eef0f4', marginLeft: 8, marginRight: 8 },
});
