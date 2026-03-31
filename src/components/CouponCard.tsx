import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../constants/theme';
import { Typography } from '@/constants/typography';

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  minAmount?: number;
  description: string;
  isApplied?: boolean;
}

export interface CouponCardProps {
  /** Coupon data */
  coupon: Coupon;
  /** Handler for apply button */
  onApply?: (couponId: string) => void;
  /** Handler for remove (when applied) */
  onRemove?: (couponId: string) => void;
  /** Container style */
  style?: ViewStyle;
  /** Currency symbol */
  currencySymbol?: string;
}

/**
 * Coupon card component with apply/applied state
 * Shows discount badge, conditions, code, and action button
 */
export const CouponCard: React.FC<CouponCardProps> = ({
  coupon,
  onApply,
  onRemove,
  style,
  currencySymbol = '₹',
}) => {
  const handlePress = () => {
    if (coupon.isApplied) {
      onRemove?.(coupon.id);
    } else {
      onApply?.(coupon.id);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Discount Badge */}
      <View style={styles.badgeContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeAmount}>
            {currencySymbol}{coupon.discount}
          </Text>
          <Text style={styles.badgeText}>OFF</Text>
        </View>
      </View>

      {/* Coupon Info */}
      <View style={styles.infoContainer}>
        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {coupon.description}
        </Text>

        {/* Coupon Code */}
        <Text style={styles.code}>{coupon.code}</Text>

        {/* Apply Button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            coupon.isApplied ? styles.appliedButton : styles.applyButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handlePress}
        >
          {coupon.isApplied ? (
            <View style={styles.appliedContent}>
              <Text style={styles.appliedText}>✓ APPLIED</Text>
            </View>
          ) : (
            <Text style={styles.applyText}>APPLY</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
    marginRight: Spacing.md,
    overflow: 'hidden',
  },
  badgeContainer: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  badge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#00ACC1',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  badgeAmount: {
    ...Typography.body,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  badgeText: {
    ...Typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoContainer: {
    padding: Spacing.md,
    paddingTop: Spacing.sm,
  },
  description: {
    ...Typography.body,
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    minHeight: 28,
  },
  code: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },
  button: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButton: {
    backgroundColor: '#FF9800',
  },
  appliedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  applyText: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appliedContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appliedText: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
