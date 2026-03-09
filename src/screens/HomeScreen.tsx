import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigateFunction } from '../navigation';
import RoleCard from '../components/RoleCard';

type HomeScreenProps = {
  navigate: NavigateFunction;
};

const ROLES = [
  {
    screen: 'admin' as const,
    emoji: '🛠️',
    title: 'Admin Panel',
    subtitle: 'Manage users, orders, and platform settings',
    accentColor: '#6C3082',
  },
  {
    screen: 'support' as const,
    emoji: '🎧',
    title: 'Support',
    subtitle: 'Handle customer tickets and resolve issues',
    accentColor: '#0077B6',
  },
  {
    screen: 'customer' as const,
    emoji: '🛍️',
    title: 'Customer',
    subtitle: 'Browse restaurants, place and track orders',
    accentColor: '#FF6B00',
  },
  {
    screen: 'rider' as const,
    emoji: '🚴',
    title: 'Rider',
    subtitle: 'Manage deliveries and earnings in real time',
    accentColor: '#2ECC71',
  },
  {
    screen: 'restaurant' as const,
    emoji: '🍽️',
    title: 'Restaurant & Market',
    subtitle: 'Manage your menu, orders and store settings',
    accentColor: '#E74C3C',
  },
] as const;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigate }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.hero}>
        <Text style={styles.logoText}>DEVO-S</Text>
        <Text style={styles.tagline}>Your all-in-one delivery platform</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Select your interface</Text>
        {ROLES.map((role) => (
          <RoleCard
            key={role.screen}
            emoji={role.emoji}
            title={role.title}
            subtitle={role.subtitle}
            accentColor={role.accentColor}
            onPress={() => navigate(role.screen)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  hero: {
    backgroundColor: '#FF6B00',
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 4,
  },
  tagline: {
    marginTop: 6,
    fontSize: 14,
    color: '#FFD5B0',
    letterSpacing: 0.5,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9099A8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 14,
  },
});

export default HomeScreen;
