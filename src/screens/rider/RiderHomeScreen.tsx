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
import { Order, OrderStatus, Rider, RiderStatus } from '../../types';

type RiderHomeScreenProps = {
  navigate: NavigateFunction;
};

const MOCK_RIDER: Rider = {
  id: 'rider42',
  userId: 'u42',
  name: 'Alex Rider',
  status: 'available',
  currentLocation: { latitude: 33.5138, longitude: 36.2765 },
  totalDeliveries: 312,
  rating: 4.9,
};

const MOCK_DELIVERIES: Array<Order & { restaurant: string }> = [
  {
    id: 'ORD-5523',
    customerId: 'c1',
    restaurantId: 'r1',
    riderId: 'rider42',
    restaurant: 'Burger Palace',
    items: [{ productId: 'p1', name: 'Classic Burger', quantity: 2, unitPrice: 8.5 }],
    total: 17.0,
    status: 'on_the_way',
    createdAt: '2026-03-09T06:30:00Z',
    address: '77 Customer Lane',
  },
  {
    id: 'ORD-5480',
    customerId: 'c2',
    restaurantId: 'r2',
    riderId: 'rider42',
    restaurant: 'Fresh Mart',
    items: [{ productId: 'p3', name: 'Groceries Bundle', quantity: 1, unitPrice: 34.0 }],
    total: 34.0,
    status: 'delivered',
    createdAt: '2026-03-09T05:00:00Z',
    address: '22 North Ave',
  },
];

const STATUS_CONFIG: Partial<Record<OrderStatus, { label: string; color: string; bg: string }>> = {
  on_the_way: { label: 'On the Way 🚴', color: '#FF6B00', bg: '#FFF3E8' },
  delivered: { label: 'Delivered ✅', color: '#2ECC71', bg: '#E8FAF0' },
  picked_up: { label: 'Picked Up', color: '#F39C12', bg: '#FEF6E4' },
};

const RIDER_STATUS_COLORS: Record<RiderStatus, string> = {
  available: '#2ECC71',
  busy: '#F39C12',
  offline: '#9099A8',
};

const RiderHomeScreen: React.FC<RiderHomeScreenProps> = ({ navigate }) => {
  const [riderStatus, setRiderStatus] = useState<RiderStatus>(MOCK_RIDER.status);

  const cycleStatus = () => {
    const order: RiderStatus[] = ['available', 'busy', 'offline'];
    const next = order[(order.indexOf(riderStatus) + 1) % order.length];
    setRiderStatus(next);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Rider" onBack={() => navigate('home')} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {MOCK_RIDER.name.split(' ').map((n) => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.riderName}>{MOCK_RIDER.name}</Text>
            <Text style={styles.riderStats}>
              ⭐ {MOCK_RIDER.rating}  ·  📦 {MOCK_RIDER.totalDeliveries} deliveries
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.statusBadge, { backgroundColor: RIDER_STATUS_COLORS[riderStatus] + '22' }]}
            onPress={cycleStatus}
            accessibilityLabel="Toggle rider status"
          >
            <View style={[styles.statusDot, { backgroundColor: RIDER_STATUS_COLORS[riderStatus] }]} />
            <Text style={[styles.statusText, { color: RIDER_STATUS_COLORS[riderStatus] }]}>
              {riderStatus.charAt(0).toUpperCase() + riderStatus.slice(1)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Earnings summary */}
        <View style={styles.earningsRow}>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsValue}>$84.50</Text>
            <Text style={styles.earningsLabel}>Today</Text>
          </View>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsValue}>$412.00</Text>
            <Text style={styles.earningsLabel}>This Week</Text>
          </View>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsValue}>12</Text>
            <Text style={styles.earningsLabel}>Trips Today</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Deliveries</Text>
        {MOCK_DELIVERIES.map((order) => {
          const cfg = STATUS_CONFIG[order.status] ?? {
            label: order.status,
            color: '#9099A8',
            bg: '#F0F1F3',
          };
          return (
            <View key={order.id} style={styles.deliveryCard}>
              <View style={styles.deliveryHeader}>
                <Text style={styles.deliveryId}>{order.id}</Text>
                <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
                  <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
                </View>
              </View>
              <Text style={styles.deliveryRestaurant}>📍 {order.restaurant}</Text>
              <Text style={styles.deliveryAddress}>🏠 {order.address}</Text>
              <Text style={styles.deliveryTotal}>Total: ${order.total.toFixed(2)}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F6F9' },
  content: { padding: 16, paddingBottom: 40 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2ECC71',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  profileInfo: { flex: 1 },
  riderName: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 3 },
  riderStats: { fontSize: 13, color: '#6C757D' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, fontWeight: '700' },
  earningsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  earningsCard: {
    flex: 1,
    backgroundColor: '#2ECC71',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  earningsValue: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  earningsLabel: { fontSize: 11, color: '#C8F7DC', marginTop: 2 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  deliveryCard: {
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
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryId: { fontSize: 12, fontWeight: '700', color: '#9099A8' },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  deliveryRestaurant: { fontSize: 14, color: '#444', marginBottom: 3 },
  deliveryAddress: { fontSize: 13, color: '#6C757D', marginBottom: 3 },
  deliveryTotal: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
});

export default RiderHomeScreen;
