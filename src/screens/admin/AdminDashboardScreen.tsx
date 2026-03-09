import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { NavigateFunction } from '../../navigation';
import { AdminStats } from '../../types';

type AdminDashboardScreenProps = {
  navigate: NavigateFunction;
};

const MOCK_STATS: AdminStats = {
  totalOrders: 1248,
  activeRiders: 34,
  registeredUsers: 5821,
  totalRestaurants: 97,
  revenueToday: 3450,
};

type StatCardProps = {
  label: string;
  value: string;
  accentColor: string;
  emoji: string;
};

const StatCard: React.FC<StatCardProps> = ({ label, value, accentColor, emoji }) => (
  <View style={[styles.statCard, { borderTopColor: accentColor }]}>
    <Text style={styles.statEmoji}>{emoji}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ navigate }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Admin Panel" onBack={() => navigate('home')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Platform Overview</Text>

        <View style={styles.grid}>
          <StatCard emoji="📦" label="Total Orders" value={MOCK_STATS.totalOrders.toLocaleString()} accentColor="#6C3082" />
          <StatCard emoji="🚴" label="Active Riders" value={String(MOCK_STATS.activeRiders)} accentColor="#2ECC71" />
          <StatCard emoji="👥" label="Registered Users" value={MOCK_STATS.registeredUsers.toLocaleString()} accentColor="#0077B6" />
          <StatCard emoji="🍽️" label="Restaurants" value={String(MOCK_STATS.totalRestaurants)} accentColor="#E74C3C" />
        </View>

        <View style={styles.revenueCard}>
          <Text style={styles.revenueLabel}>Today's Revenue</Text>
          <Text style={styles.revenueValue}>${MOCK_STATS.revenueToday.toLocaleString()}</Text>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {[
          { emoji: '👤', label: 'Manage Users' },
          { emoji: '🏪', label: 'Manage Restaurants' },
          { emoji: '📋', label: 'View All Orders' },
          { emoji: '📊', label: 'Analytics & Reports' },
          { emoji: '⚙️', label: 'Platform Settings' },
        ].map((action) => (
          <View key={action.label} style={styles.actionRow}>
            <Text style={styles.actionEmoji}>{action.emoji}</Text>
            <Text style={styles.actionLabel}>{action.label}</Text>
            <Text style={styles.actionChevron}>›</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F6F9' },
  content: { padding: 20, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 14,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderTopWidth: 4,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  statEmoji: { fontSize: 24, marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: '800', color: '#1A1A2E' },
  statLabel: { fontSize: 12, color: '#6C757D', marginTop: 2 },
  revenueCard: {
    backgroundColor: '#6C3082',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#6C3082',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  revenueLabel: { fontSize: 14, color: '#E8BFFF', marginBottom: 4 },
  revenueValue: { fontSize: 36, fontWeight: '900', color: '#FFFFFF' },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  actionEmoji: { fontSize: 20, marginRight: 14 },
  actionLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1A1A2E' },
  actionChevron: { fontSize: 22, color: '#9099A8' },
});

export default AdminDashboardScreen;
