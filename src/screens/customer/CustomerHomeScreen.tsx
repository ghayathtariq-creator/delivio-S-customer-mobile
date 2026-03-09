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
import { Order, OrderStatus, Restaurant } from '../../types';

type CustomerHomeScreenProps = {
  navigate: NavigateFunction;
};

const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Burger Palace',
    ownerId: 'o1',
    address: '12 Main St',
    category: 'restaurant',
    rating: 4.7,
    isOpen: true,
    imageUrl: '',
  },
  {
    id: 'r2',
    name: 'Fresh Mart',
    ownerId: 'o2',
    address: '45 Market Ave',
    category: 'market',
    rating: 4.5,
    isOpen: true,
    imageUrl: '',
  },
  {
    id: 'r3',
    name: 'Pizza Town',
    ownerId: 'o3',
    address: '9 Olive Rd',
    category: 'restaurant',
    rating: 4.3,
    isOpen: false,
    imageUrl: '',
  },
];

const MOCK_ACTIVE_ORDER: Order = {
  id: 'ORD-5523',
  customerId: 'c1',
  restaurantId: 'r1',
  riderId: 'rider42',
  items: [
    { productId: 'p1', name: 'Classic Burger', quantity: 2, unitPrice: 8.5 },
    { productId: 'p2', name: 'Cola', quantity: 2, unitPrice: 2.0 },
  ],
  total: 21.0,
  status: 'on_the_way',
  createdAt: '2026-03-09T06:30:00Z',
  address: '77 Customer Lane',
};

const STATUS_STEPS: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'picked_up',
  'on_the_way',
  'delivered',
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready',
  picked_up: 'Picked Up',
  on_the_way: 'On the Way 🚴',
  delivered: 'Delivered ✅',
  cancelled: 'Cancelled ❌',
};

const CustomerHomeScreen: React.FC<CustomerHomeScreenProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'orders'>('browse');
  const currentStep = STATUS_STEPS.indexOf(MOCK_ACTIVE_ORDER.status);

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Customer" onBack={() => navigate('home')} />

      <View style={styles.tabBar}>
        {(['browse', 'orders'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'browse' ? '🏪 Browse' : '📦 My Orders'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'browse' ? (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Nearby Restaurants & Markets</Text>
          {MOCK_RESTAURANTS.map((r) => (
            <View key={r.id} style={styles.restaurantCard}>
              <View style={styles.restaurantIcon}>
                <Text style={styles.restaurantEmoji}>
                  {r.category === 'market' ? '🛒' : '🍽️'}
                </Text>
              </View>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{r.name}</Text>
                <Text style={styles.restaurantAddress}>{r.address}</Text>
                <View style={styles.restaurantMeta}>
                  <Text style={styles.rating}>⭐ {r.rating}</Text>
                  <View
                    style={[
                      styles.openBadge,
                      { backgroundColor: r.isOpen ? '#E8FAF0' : '#FDECEA' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.openBadgeText,
                        { color: r.isOpen ? '#2ECC71' : '#E74C3C' },
                      ]}
                    >
                      {r.isOpen ? 'Open' : 'Closed'}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.cardChevron}>›</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Active Order</Text>
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{MOCK_ACTIVE_ORDER.id}</Text>
              <Text style={styles.orderTotal}>${MOCK_ACTIVE_ORDER.total.toFixed(2)}</Text>
            </View>

            {MOCK_ACTIVE_ORDER.items.map((item) => (
              <Text key={item.productId} style={styles.orderItem}>
                {item.quantity}× {item.name}
              </Text>
            ))}

            <Text style={styles.trackingTitle}>Order Tracking</Text>
            <View style={styles.tracker}>
              {STATUS_STEPS.map((step, i) => (
                <View key={step} style={styles.trackerStep}>
                  <View
                    style={[
                      styles.trackerDot,
                      i <= currentStep
                        ? styles.trackerDotActive
                        : styles.trackerDotInactive,
                    ]}
                  />
                  <Text
                    style={[
                      styles.trackerLabel,
                      i <= currentStep && styles.trackerLabelActive,
                    ]}
                  >
                    {STATUS_LABELS[step]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F6F9' },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF0',
  },
  tab: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF6B00',
  },
  tabText: { fontSize: 14, fontWeight: '600', color: '#9099A8' },
  tabTextActive: { color: '#FF6B00' },
  content: { padding: 16, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 14,
  },
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  restaurantIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FFF3E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  restaurantEmoji: { fontSize: 24 },
  restaurantInfo: { flex: 1 },
  restaurantName: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginBottom: 2 },
  restaurantAddress: { fontSize: 12, color: '#9099A8', marginBottom: 6 },
  restaurantMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rating: { fontSize: 12, color: '#F39C12', fontWeight: '600' },
  openBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  openBadgeText: { fontSize: 11, fontWeight: '700' },
  cardChevron: { fontSize: 22, color: '#9099A8' },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: { fontSize: 13, fontWeight: '700', color: '#9099A8' },
  orderTotal: { fontSize: 16, fontWeight: '800', color: '#FF6B00' },
  orderItem: { fontSize: 14, color: '#444', marginBottom: 3 },
  trackingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginTop: 16,
    marginBottom: 12,
  },
  tracker: { gap: 10 },
  trackerStep: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  trackerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  trackerDotActive: { backgroundColor: '#FF6B00' },
  trackerDotInactive: { backgroundColor: '#DDE1E7' },
  trackerLabel: { fontSize: 13, color: '#B0B8C4' },
  trackerLabelActive: { color: '#1A1A2E', fontWeight: '600' },
});

export default CustomerHomeScreen;
