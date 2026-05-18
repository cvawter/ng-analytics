import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import {
  spotPrices, futuresCurve,
  oilSpotPrices, oilFuturesCurve,
  silverSpotPrices, silverFuturesCurve,
  batteryMetalsSpot, batteryMetalsFutures, batteryMetalsIndividual,
  reeSpotPrices, reeFuturesCurve, reeIndividualPrices,
} from '@ng-analytics/shared';

const screenWidth = Dimensions.get('window').width;

const TABS = [
  { key: 'ng',      label: 'Nat Gas',      spot: spotPrices,       futures: futuresCurve,        color: '#f0a500' },
  { key: 'oil',     label: 'WTI Oil',      spot: oilSpotPrices,    futures: oilFuturesCurve,     color: '#60a5fa' },
  { key: 'silver',  label: 'Silver',       spot: silverSpotPrices, futures: silverFuturesCurve,  color: '#a78bfa' },
  { key: 'battery', label: 'Batt. Metals', spot: batteryMetalsSpot,futures: batteryMetalsFutures, color: '#f472b6' },
  { key: 'ree',     label: 'Rare Earths',  spot: reeSpotPrices,    futures: reeFuturesCurve,     color: '#34d399' },
];

const chartConfig = (color: string) => ({
  backgroundColor: '#161922',
  backgroundGradientFrom: '#161922',
  backgroundGradientTo: '#161922',
  decimalPlaces: 2,
  color: (_opacity = 1) => color,
  labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: '4', strokeWidth: '2', stroke: '#0d0f14' },
  propsForBackgroundLines: { strokeDasharray: '4', stroke: 'rgba(255,255,255,0.05)' },
});

export default function MarketsScreen() {
  const [activeTab, setActiveTab] = useState('ng');
  const tab = TABS.find(t => t.key === activeTab) ?? TABS[0];
  const { spot, futures, color } = tab;

  const futuresChartData = {
    labels: futures.map((d: any) => d.month.split(' ')[0]),
    datasets: [{ data: futures.map((d: any) => d.price), color: (_opacity = 1) => color, strokeWidth: 3 }],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map(t => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, activeTab === t.key && { backgroundColor: `${t.color}22`, borderColor: `${t.color}60` }]}
            onPress={() => setActiveTab(t.key)}
          >
            <Text style={[styles.tabText, activeTab === t.key && { color: t.color }]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Spot Price Card */}
      <View style={[styles.spotCard, { borderColor: `${color}30` }]}>
        <View style={styles.spotHeader}>
          <View style={styles.spotHeaderLeft}>
            <Feather name="activity" size={16} color="#9ca3af" />
            <Text style={styles.symbolText}>{spot.symbol}</Text>
          </View>
          <View style={[styles.liveBadge, { backgroundColor: `${color}30` }]}>
            <Text style={[styles.liveText, { color }]}>LIVE</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={[styles.priceText, { color }]}>${spot.price.toFixed(spot.unit === 'MMBtu' ? 3 : spot.price < 10 ? 2 : 2)}</Text>
          <Text style={styles.unitText}>/ {spot.unit}</Text>
        </View>

        <View style={styles.trendContainer}>
          <Feather
            name={spot.trend === 'up' ? 'trending-up' : 'trending-down'}
            size={16}
            color={spot.trend === 'up' ? '#4ade80' : '#ef4444'}
          />
          <Text style={[styles.trendText, { color: spot.trend === 'up' ? '#4ade80' : '#ef4444' }]}>
            {spot.change} ({spot.percentChange})
          </Text>
        </View>

        <View style={styles.spotFooter}>
          <Text style={styles.footerText}>{spot.name}</Text>
          <Text style={styles.footerText}>Updated: {spot.lastUpdated}</Text>
        </View>
      </View>

      {/* Individual Prices Panel — REE and Battery Metals */}
      {(activeTab === 'ree' || activeTab === 'battery') && (
        <View style={[styles.reeCard, { borderColor: `${color}25` }]}>
          <Text style={styles.reeCardTitle}>{activeTab === 'battery' ? 'Battery Metal Spot Prices' : 'Individual REE Spot Prices'}</Text>
          {(activeTab === 'ree' ? reeIndividualPrices : batteryMetalsIndividual).map((r: any) => (
            <View key={r.symbol} style={styles.reeRow}>
              <View style={styles.reeLeft}>
                <Text style={[styles.reeSymbol, { color }]}>{r.symbol}</Text>
                <Text style={styles.reeName}>{r.name}</Text>
                <Text style={styles.reeNote}>{r.note}</Text>
              </View>
              <View style={styles.reeRight}>
                <Text style={styles.reePrice}>${r.price.toFixed(r.price < 10 ? 2 : 0)}<Text style={styles.reeUnit}>/{r.unit}</Text></Text>
                <Text style={[styles.reeChange, { color: r.trend === 'up' ? '#4ade80' : '#ef4444' }]}>{r.change}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Futures / Price Outlook Chart */}
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View style={[styles.chartIconBox, { backgroundColor: `${color}18` }]}>
            <Feather name="calendar" size={20} color={color} />
          </View>
          <View>
            <Text style={styles.chartTitle}>{activeTab === 'ree' ? 'NdPr Price Outlook' : activeTab === 'battery' ? 'Li Carbonate Outlook' : 'Futures Curve'}</Text>
            <Text style={styles.chartSubtitle}>{activeTab === 'ree' || activeTab === 'battery' ? '12-Month Analyst Consensus · $/kg' : '12-Month Forward Strip'}</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScroll}>
          <LineChart
            data={futuresChartData}
            width={Math.max(screenWidth, 600)}
            height={260}
            chartConfig={chartConfig(color)}
            bezier
            style={styles.chart}
            withVerticalLines={false}
            withShadow={false}
            yAxisLabel="$"
          />
        </ScrollView>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0f14' },
  content: { padding: 16, paddingBottom: 40, gap: 16 },
  tabBar: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  tab: { flex: 1, paddingVertical: 8, paddingHorizontal: 4, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)', alignItems: 'center' },
  tabText: { color: '#6b7280', fontSize: 12, fontWeight: '700' },
  spotCard: { backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1, borderRadius: 20, padding: 24 },
  spotHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  spotHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  symbolText: { color: '#9ca3af', fontSize: 15, fontWeight: '600' },
  liveBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  liveText: { fontSize: 10, fontWeight: '800' },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  priceText: { fontSize: 48, fontWeight: '900' },
  unitText: { fontSize: 16, color: '#9ca3af', marginLeft: 8, fontWeight: '500' },
  trendContainer: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 24 },
  trendText: { fontSize: 16, fontWeight: '700' },
  spotFooter: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.05)', paddingTop: 16 },
  footerText: { color: '#6b7280', fontSize: 11 },
  reeCard: { backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1, borderColor: 'rgba(52,211,153,0.15)', borderRadius: 20, padding: 20 },
  reeCardTitle: { color: '#eef0f4', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  reeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 10, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.04)' },
  reeLeft: { flex: 1, gap: 2 },
  reeSymbol: { fontSize: 11, fontWeight: '800', fontFamily: 'monospace' },
  reeName: { color: '#eef0f4', fontSize: 13, fontWeight: '600' },
  reeNote: { color: '#6b7280', fontSize: 11 },
  reeRight: { alignItems: 'flex-end', gap: 2 },
  reePrice: { color: '#fff', fontSize: 14, fontWeight: '700', fontFamily: 'monospace' },
  reeUnit: { color: '#6b7280', fontSize: 10 },
  reeChange: { fontSize: 11, fontWeight: '700' },
  chartCard: { backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 20, paddingHorizontal: 0 },
  chartHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20, paddingHorizontal: 20 },
  chartIconBox: { padding: 8, borderRadius: 8 },
  chartTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  chartSubtitle: { color: '#9ca3af', fontSize: 13 },
  chartScroll: { paddingLeft: 10 },
  chart: { borderRadius: 16, paddingRight: 30 },
});
