import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type HeaderProps = {
  title: string;
  onBack?: () => void;
};

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableOpacity
          style={styles.sideSlot}
          onPress={onBack}
          accessibilityLabel="Go back"
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.sideSlot} />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.sideSlot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  title: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  sideSlot: {
    width: 40,
    alignItems: 'center',
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Header;
