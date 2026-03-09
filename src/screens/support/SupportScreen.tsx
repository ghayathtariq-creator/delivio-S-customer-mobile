import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { NavigateFunction } from '../../navigation';
import { SupportTicket, TicketStatus } from '../../types';

type SupportScreenProps = {
  navigate: NavigateFunction;
};

const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'T001',
    userId: 'u1',
    subject: 'Order not delivered',
    message: 'My order #1023 has not arrived after 2 hours.',
    status: 'open',
    createdAt: '2026-03-09T05:00:00Z',
  },
  {
    id: 'T002',
    userId: 'u2',
    subject: 'Wrong items received',
    message: 'I received a burger instead of pizza.',
    status: 'in_progress',
    createdAt: '2026-03-09T04:30:00Z',
    assignedTo: 'Agent Sarah',
  },
  {
    id: 'T003',
    userId: 'u3',
    subject: 'Refund request',
    message: 'Requesting refund for cancelled order #998.',
    status: 'resolved',
    createdAt: '2026-03-08T20:00:00Z',
    assignedTo: 'Agent Mike',
  },
  {
    id: 'T004',
    userId: 'u4',
    subject: 'App crash on checkout',
    message: 'The app crashes every time I try to pay.',
    status: 'open',
    createdAt: '2026-03-09T06:10:00Z',
  },
];

const STATUS_CONFIG: Record<TicketStatus, { label: string; color: string; bg: string }> = {
  open: { label: 'Open', color: '#E74C3C', bg: '#FDECEA' },
  in_progress: { label: 'In Progress', color: '#F39C12', bg: '#FEF6E4' },
  resolved: { label: 'Resolved', color: '#2ECC71', bg: '#E8FAF0' },
  closed: { label: 'Closed', color: '#9099A8', bg: '#F0F1F3' },
};

const FILTERS: Array<TicketStatus | 'all'> = ['all', 'open', 'in_progress', 'resolved', 'closed'];

const SupportScreen: React.FC<SupportScreenProps> = ({ navigate }) => {
  const [filter, setFilter] = useState<TicketStatus | 'all'>('all');

  const visible = filter === 'all'
    ? MOCK_TICKETS
    : MOCK_TICKETS.filter((t) => t.status === filter);

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Support" onBack={() => navigate('home')} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterBar}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterLabel, filter === f && styles.filterLabelActive]}>
              {f === 'all' ? 'All' : STATUS_CONFIG[f].label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.countText}>{visible.length} ticket{visible.length !== 1 ? 's' : ''}</Text>
        {visible.map((ticket) => {
          const cfg = STATUS_CONFIG[ticket.status];
          return (
            <View key={ticket.id} style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                <Text style={styles.ticketId}>{ticket.id}</Text>
                <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
                  <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
                </View>
              </View>
              <Text style={styles.ticketSubject}>{ticket.subject}</Text>
              <Text style={styles.ticketMessage} numberOfLines={2}>{ticket.message}</Text>
              {ticket.assignedTo && (
                <Text style={styles.ticketAgent}>👤 {ticket.assignedTo}</Text>
              )}
              <Text style={styles.ticketDate}>
                {new Date(ticket.createdAt).toLocaleString()}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F6F9' },
  filterBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE1E7',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#0077B6',
    borderColor: '#0077B6',
  },
  filterLabel: { fontSize: 13, fontWeight: '600', color: '#6C757D' },
  filterLabelActive: { color: '#FFFFFF' },
  content: { padding: 16, paddingBottom: 40 },
  countText: {
    fontSize: 13,
    color: '#9099A8',
    marginBottom: 12,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  ticketId: { fontSize: 12, fontWeight: '700', color: '#9099A8' },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: { fontSize: 12, fontWeight: '700' },
  ticketSubject: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  ticketMessage: { fontSize: 13, color: '#6C757D', marginBottom: 8 },
  ticketAgent: { fontSize: 12, color: '#0077B6', marginBottom: 4 },
  ticketDate: { fontSize: 11, color: '#B0B8C4' },
});

export default SupportScreen;
