import { useCart } from '@/hooks/useCart';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/theme';

export interface CartIconProps {
  /** Icon color */
  color?: string;
  /** Icon size */
  size?: number;
  /** Badge background color */
  badgeColor?: string;
  /** Badge text color */
  badgeTextColor?: string;
  /** Show badge even when count is 0 */
  alwaysShowBadge?: boolean;
}

/**
 * Cart icon with item count badge
 * Automatically syncs with global cart state
 * Tapping navigates to cart screen
 */
export const CartIcon: React.FC<CartIconProps> = ({
  color = '#858585',
  size = 24,
  badgeColor = Colors.primary,
  badgeTextColor = '#FFFFFF',
  alwaysShowBadge = false,
}) => {
  const router = useRouter();
  const { totalItems } = useCart();

  const handlePress = () => {
    router.push('/cart');
  };

  return (
    <Pressable onPress={handlePress} style={styles.container} hitSlop={8}>
      <Feather name="shopping-cart" size={size} color={color} />
      {(totalItems > 0 || alwaysShowBadge) && (
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={[styles.badgeText, { color: badgeTextColor }]}>
            {totalItems > 99 ? '99+' : totalItems}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
