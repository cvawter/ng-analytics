import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { spotPrices, futuresCurve } from '@ng-analytics/shared';

const screenWidth = Dimensions.get('window').width;

export default function MarketsScreen() {
  const chartData = {
    labels: futuresCurve.map(d => d.month.split(' ')[0]), // "Jan", "Feb" etc.
    datasets: [
      {
        data: futuresCurve.map(d => d.price),
        color: (opacity = 1) => `rgba(240, 165, 0, ${opacity})`, // #f0a500
        strokeWidth: 3
      }
    ]
  };

  const chartConfig = {
    backgroundColor: '#161922',
    backgroundGradientFrom: '#161922',
    backgroundGradientTo: '#161922',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`, // text-[#9ca3af]
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#0d0f14'
    },
    propsForBackgroundLines: {
      strokeDasharray: '4',
      stroke: 'rgba(255,255,255,0.05)'
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Spot Price Card */}
      <View style={styles.spotCard}>
        <View style={styles.spotHeader}>
          <View style={styles.spotHeaderLeft}>
            <Feather name="activity" size={16} color="#9ca3af" />
            <Text style={styles.symbolText}>{spotPrices.symbol}</Text>
          </View>
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${spotPrices.price.toFixed(3)}</Text>
          <Text style={styles.unitText}>/ MMBtu</Text>
        </View>

        <View style={styles.trendContainer}>
          <Feather 
            name={spotPrices.trend === 'up' ? 'trending-up' : 'trending-down'} 
            size={16} 
            color={spotPrices.trend === 'up' ? '#4ade80' : '#ef4444'} 
          />
          <Text style={[styles.trendText, { color: spotPrices.trend === 'up' ? '#4ade80' : '#ef4444' }]}>
            {spotPrices.change} ({spotPrices.percentChange})
          </Text>
        </View>

        <View style={styles.spotFooter}>
          <Text style={styles.footerText}>{spotPrices.name}</Text>
          <Text style={styles.footerText}>Updated: {spotPrices.lastUpdated}</Text>
        </View>
      </View>

      {/* Futures Curve Chart */}
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View style={styles.chartIconBox}>
            <Feather name="calendar" size={20} color="#f0a500" />
          </View>
          <View>
            <Text style={styles.chartTitle}>Futures Curve</Text>
            <Text style={styles.chartSubtitle}>12-Month Forward Strip</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScroll}>
          <LineChart
            data={chartData}
            width={Math.max(screenWidth, 600)} // Ensure enough width to avoid cramped labels
            height={260}
            chartConfig={chartConfig}
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
  container: {
    flex: 1,
    backgroundColor: '#0d0f14',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  spotCard: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 24,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  spotHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  symbolText: {
    color: '#9ca3af',
    fontSize: 15,
    fontWeight: '600',
  },
  liveBadge: {
    backgroundColor: 'rgba(240,165,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveText: {
    color: '#f0a500',
    fontSize: 10,
    fontWeight: '800',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#fff',
  },
  unitText: {
    fontSize: 16,
    color: '#9ca3af',
    marginLeft: 8,
    fontWeight: '500',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  trendText: {
    fontSize: 16,
    fontWeight: '700',
  },
  spotFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    paddingTop: 16,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 11,
  },
  chartCard: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 0, // Let chart touch edges
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  chartIconBox: {
    backgroundColor: 'rgba(240,165,0,0.1)',
    padding: 8,
    borderRadius: 8,
  },
  chartTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  chartSubtitle: {
    color: '#9ca3af',
    fontSize: 13,
  },
  chartScroll: {
    paddingLeft: 10,
  },
  chart: {
    borderRadius: 16,
    paddingRight: 30, // Extra padding for the right-most label
  }
});
