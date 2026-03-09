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
import { Order, OrderStatus, Product } from '../../types';

type RestaurantScreenProps = {
  navigate: NavigateFunction;
};

const MOCK_MENU: Product[] = [
  {
    id: 'p1',
    name: 'Classic Burger',
    description: 'Beef patty, lettuce, tomato, special sauce',
    price: 8.5,
    category: 'Burgers',
    available: true,
  },
  {
    id: 'p2',
    name: 'Double Smash',
    description: 'Two smashed patties, cheese, pickles',
    price: 11.0,
    category: 'Burgers',
    available: true,
  },
  {
    id: 'p3',
    name: 'Veggie Wrap',
    description: 'Grilled vegetables, hummus, tortilla',
    price: 7.0,
    category: 'Wraps',
    available: false,
  },
  {
    id: 'p4',
    name: 'Cola',
    description: '330ml can',
    price: 2.0,
    category: 'Drinks',
    available: true,
  },
];

const MOCK_INCOMING_ORDERS: Array<Order & { customerName: string }> = [
  {
    id: 'ORD-5523',
    customerId: 'c1',
    restaurantId: 'r1',
    items: [
      { productId: 'p1', name: 'Classic Burger', quantity: 2, unitPrice: 8.5 },
      { productId: 'p4', name: 'Cola', quantity: 2, unitPrice: 2.0 },
    ],
    total: 21.0,
    status: 'confirmed',
    createdAt: '2026-03-09T06:30:00Z',
    address: '77 Customer Lane',
    customerName: 'Omar K.',
  },
  {
    id: 'ORD-5541',
    customerId: 'c2',
    restaurantId: 'r1',
    items: [{ productId: 'p2', name: 'Double Smash', quantity: 1, unitPrice: 11.0 }],
    total: 11.0,
    status: 'preparing',
    createdAt: '2026-03-09T06:45:00Z',
    address: '5 Lake Blvd',
    customerName: 'Sara M.',
  },
];

const STATUS_CONFIG: Partial<Record<OrderStatus, { label: string; color: string; bg: string }>> = {
  pending: { label: 'New Order 🔔', color: '#E74C3C', bg: '#FDECEA' },
  confirmed: { label: 'Confirmed ✅', color: '#2ECC71', bg: '#E8FAF0' },
  preparing: { label: 'Preparing 👨‍🍳', color: '#F39C12', bg: '#FEF6E4' },
  ready: { label: 'Ready for Pickup', color: '#0077B6', bg: '#E3F2FD' },
};

const RestaurantScreen: React.FC<RestaurantScreenProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Restaurant & Market" onBack={() => navigate('home')} />

      {/* Store summary */}
      <View style={styles.storeBanner}>
        <Text style={styles.storeEmoji}>🍔</Text>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>Burger Palace</Text>
          <Text style={styles.storeCategory}>Restaurant  ·  ⭐ 4.7</Text>
        </View>
        <View style={styles.openDot} />
        <Text style={styles.openLabel}>Open</Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statVal}>$412</Text>
          <Text style={styles.statLbl}>Today's Sales</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statVal}>28</Text>
          <Text style={styles.statLbl}>Orders Today</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statVal}>2</Text>
          <Text style={styles.statLbl}>Active Now</Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        {(['orders', 'menu'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'orders' ? '📋 Orders' : '🍽️ Menu'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'orders' ? (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {MOCK_INCOMING_ORDERS.map((order) => {
            const cfg = STATUS_CONFIG[order.status] ?? {
              label: order.status,
              color: '#9099A8',
              bg: '#F0F1F3',
            };
            return (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderCardHeader}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
                    <Text style={[styles.badgeText, { color: cfg.color }]}>{cfg.label}</Text>
                  </View>
                </View>
                <Text style={styles.customerName}>👤 {order.customerName}</Text>
                {order.items.map((item) => (
                  <Text key={item.productId} style={styles.orderItem}>
                    {item.quantity}× {item.name}
                  </Text>
                ))}
                <View style={styles.orderFooter}>
                  <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
                  <Text style={styles.orderTime}>
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {MOCK_MENU.map((item) => (
            <View key={item.id} style={[styles.menuItem, !item.available && styles.menuItemUnavailable]}>
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                {item.description && (
                  <Text style={styles.menuItemDesc}>{item.description}</Text>
                )}
                <Text style={styles.menuItemCategory}>{item.category}</Text>
              </View>
              <View style={styles.menuItemRight}>
                <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                <View
                  style={[
                    styles.availBadge,
                    { backgroundColor: item.available ? '#E8FAF0' : '#F0F1F3' },
                  ]}
                >
                  <Text
                    style={[
                      styles.availBadgeText,
                      { color: item.available ? '#2ECC71' : '#9099A8' },
                    ]}
                  >
                    {item.available ? 'Available' : 'Off'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F6F9' },
  storeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF0',
  },
  storeEmoji: { fontSize: 30, marginRight: 12 },
  storeInfo: { flex: 1 },
  storeName: { fontSize: 16, fontWeight: '700', color: '#1A1A2E' },
  storeCategory: { fontSize: 12, color: '#9099A8', marginTop: 2 },
  openDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2ECC71',
    marginRight: 5,
  },
  openLabel: { fontSize: 13, fontWeight: '700', color: '#2ECC71' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#E74C3C',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  statLbl: { fontSize: 11, color: '#FFB5AD', marginTop: 2 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF0',
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 3, borderBottomColor: '#E74C3C' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#9099A8' },
  tabTextActive: { color: '#E74C3C' },
  content: { padding: 16, paddingBottom: 40 },
  orderCard: {
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
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: { fontSize: 12, fontWeight: '700', color: '#9099A8' },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  customerName: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 6 },
  orderItem: { fontSize: 13, color: '#6C757D', marginBottom: 2 },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F1F3',
  },
  orderTotal: { fontSize: 14, fontWeight: '800', color: '#1A1A2E' },
  orderTime: { fontSize: 12, color: '#9099A8' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  menuItemUnavailable: { opacity: 0.55 },
  menuItemInfo: { flex: 1 },
  menuItemName: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginBottom: 2 },
  menuItemDesc: { fontSize: 12, color: '#9099A8', marginBottom: 3 },
  menuItemCategory: { fontSize: 11, color: '#B0B8C4' },
  menuItemRight: { alignItems: 'flex-end', gap: 6 },
  menuItemPrice: { fontSize: 16, fontWeight: '800', color: '#E74C3C' },
  availBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  availBadgeText: { fontSize: 11, fontWeight: '700' },
});

export default RestaurantScreen;
