import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const INITIAL_QUEUE = [
  {
    id: 'hyp-1',
    text: 'Unseasonably warm winter will cause a 15% increase in Working Gas injections, tightening the Basis Spread in Q1.',
    confidence: 88,
    source: 'EIA Weekly Storage Report'
  },
  {
    id: 'hyp-2',
    text: 'The Certified Welder Shortage is delaying Pipeline Expansions by an average of 4.2 months across the Gulf Coast region.',
    confidence: 92,
    source: 'Macroeconomic Labor Data'
  }
];

export default function AutoResearchScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState(['[SYSTEM] AutoResearcher Agent initialized.']);
  const [reviewQueue, setReviewQueue] = useState(INITIAL_QUEUE);
  const [wikiEntries, setWikiEntries] = useState([
    {
      id: 'wiki-1',
      text: 'Working Gas levels directly impact Regional Supply Capacity, acting as the primary buffer against weather-driven demand shocks.',
      date: new Date().toLocaleDateString()
    }
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      const messages = [
        '[AGENT] Parsing incoming EIA Storage Report...',
        '[AGENT] Extracting entities...',
        '[AGENT] Cross-referencing historical patterns...',
        '[AGENT] Proposing new hypothesis (Conf: 85%).',
        '[AGENT] Submitting to Human-in-the-Loop queue.',
      ];
      let i = 0;
      interval = setInterval(() => {
        setLogs(prev => [...prev, messages[i]]);
        i = (i + 1) % messages.length;
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleApprove = (hypothesis: typeof INITIAL_QUEUE[0]) => {
    setReviewQueue(prev => prev.filter(h => h.id !== hypothesis.id));
    setWikiEntries(prev => [{
      id: `wiki-${Date.now()}`,
      text: hypothesis.text,
      date: new Date().toLocaleDateString()
    }, ...prev]);
  };

  const handleReject = (id: string) => {
    setReviewQueue(prev => prev.filter(h => h.id !== id));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* 1. Agent Feed */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.headerTitleRow}>
            <Feather name="terminal" size={16} color="#f0a500" />
            <Text style={styles.sectionTitle}>Agent Terminal</Text>
          </View>
          <Pressable 
            style={[styles.playButton, isRunning && styles.stopButton]} 
            onPress={() => setIsRunning(!isRunning)}
          >
            <Feather name={isRunning ? "square" : "play"} size={12} color={isRunning ? "#ef4444" : "#fff"} />
            <Text style={[styles.playButtonText, isRunning && { color: '#ef4444' }]}>
              {isRunning ? 'STOP' : 'START'}
            </Text>
          </Pressable>
        </View>
        <ScrollView 
          style={styles.terminal}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {logs.map((log, i) => (
            <Text key={i} style={styles.terminalText}>{log}</Text>
          ))}
        </ScrollView>
      </View>

      {/* 2. Review Queue */}
      <View style={[styles.section, styles.highlightSection]}>
        <View style={styles.headerTitleRow}>
          <Feather name="file-text" size={16} color="#f0a500" />
          <Text style={[styles.sectionTitle, { color: '#f0a500' }]}>Review Queue</Text>
        </View>
        
        {reviewQueue.length === 0 ? (
          <Text style={styles.emptyText}>No pending hypotheses.</Text>
        ) : (
          reviewQueue.map(hyp => (
            <View key={hyp.id} style={styles.queueCard}>
              <Text style={styles.queueText}>"{hyp.text}"</Text>
              <View style={styles.queueFooter}>
                <Text style={styles.queueMeta}>Conf: {hyp.confidence}%</Text>
                <View style={styles.queueActions}>
                  <Pressable style={styles.rejectBtn} onPress={() => handleReject(hyp.id)}>
                    <Feather name="x-circle" size={20} color="#ef4444" />
                  </Pressable>
                  <Pressable style={styles.approveBtn} onPress={() => handleApprove(hyp)}>
                    <Feather name="check-circle" size={20} color="#f0a500" />
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* 3. LLM Wiki */}
      <View style={styles.section}>
        <View style={styles.headerTitleRow}>
          <Feather name="book-open" size={16} color="#60a5fa" />
          <Text style={styles.sectionTitle}>LLM Wiki Context</Text>
        </View>
        <Text style={styles.wikiDesc}>Approved statements below will be injected into the AI Chat prompt.</Text>
        
        {wikiEntries.map(entry => (
          <View key={entry.id} style={styles.wikiCard}>
            <Text style={styles.wikiDate}>Committed: {entry.date}</Text>
            <Text style={styles.wikiText}>{entry.text}</Text>
          </View>
        ))}
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
  section: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  highlightSection: {
    borderColor: 'rgba(240,165,0,0.3)',
    backgroundColor: 'rgba(240,165,0,0.02)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#eef0f4',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f0a500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  stopButton: {
    backgroundColor: 'rgba(239,68,68,0.2)',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  terminal: {
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8,
    padding: 12,
  },
  terminalText: {
    fontFamily: 'Courier',
    fontSize: 11,
    color: '#4ade80',
    marginBottom: 4,
    opacity: 0.9,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 20,
  },
  queueCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  queueText: {
    fontSize: 14,
    color: '#eef0f4',
    lineHeight: 20,
    marginBottom: 12,
  },
  queueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  queueMeta: {
    fontSize: 12,
    color: '#9ca3af',
  },
  queueActions: {
    flexDirection: 'row',
    gap: 8,
  },
  rejectBtn: {
    padding: 8,
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderRadius: 8,
  },
  approveBtn: {
    padding: 8,
    backgroundColor: 'rgba(240,165,0,0.1)',
    borderRadius: 8,
  },
  wikiDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 16,
  },
  wikiCard: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  wikiDate: {
    fontSize: 10,
    color: '#60a5fa',
    marginBottom: 8,
    fontFamily: 'Courier',
  },
  wikiText: {
    fontSize: 13,
    color: '#eef0f4',
    lineHeight: 20,
    fontFamily: 'Courier',
  },
});
