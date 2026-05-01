import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your AI Graph Analyst. I am currently running in a mock offline mode. When the backend is ready, I will query the Neo4j ontology to answer your questions. Try asking me a question!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate network delay and LLM response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `(Simulated GraphRAG Response)\n\nBased on the knowledge graph context:\n\nThe term "${userMessage.content}" maps to multiple nodes in our ontology. If the backend were connected, I would traverse the relationships and provide a detailed natural gas analysis here.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
        <View style={styles.messageHeader}>
          <Feather name={isUser ? "user" : "cpu"} size={14} color={isUser ? "#f0a500" : "#a1a1aa"} />
          <Text style={[styles.messageRole, { color: isUser ? "#f0a500" : "#a1a1aa" }]}>
            {isUser ? "You" : "MacroDesk AI"}
          </Text>
        </View>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {isTyping && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#f0a500" />
          <Text style={styles.typingText}>Analyzing graph...</Text>
        </View>
      )}

      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask about Working Gas, Permitting, etc..."
          placeholderTextColor="#6b7280"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <Pressable 
          style={({ pressed }) => [styles.sendButton, pressed && { opacity: 0.7 }]} 
          onPress={sendMessage}
        >
          <Feather name="send" size={20} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f14',
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  messageBubble: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    maxWidth: '90%',
  },
  userBubble: {
    backgroundColor: 'rgba(240,165,0,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(240,165,0,0.2)',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  messageRole: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  messageText: {
    fontSize: 15,
    color: '#eef0f4',
    lineHeight: 22,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 8,
  },
  typingText: {
    color: '#9ca3af',
    fontSize: 13,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: '#161922',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    color: '#eef0f4',
    fontSize: 15,
    maxHeight: 120,
    minHeight: 44,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0a500',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});
