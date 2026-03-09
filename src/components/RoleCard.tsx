import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type RoleCardProps = {
  emoji: string;
  title: string;
  subtitle: string;
  accentColor: string;
  onPress: () => void;
};

const RoleCard: React.FC<RoleCardProps> = ({
  emoji,
  title,
  subtitle,
  accentColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: accentColor }]}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={`Open ${title}`}
    >
      <View style={[styles.iconBox, { backgroundColor: accentColor + '22' }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={[styles.chevron, { color: accentColor }]}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderLeftWidth: 5,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: {
    fontSize: 26,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#6C757D',
  },
  chevron: {
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default RoleCard;
