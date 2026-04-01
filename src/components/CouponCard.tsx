import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from '../constants/theme';
import { fontFamily, Typography } from '@/constants/typography';

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
      <View style={styles.badge}>
        <Text style={styles.badgeAmount}>
          {currencySymbol}{coupon.discount}
        </Text>
        <Text style={styles.badgeText}>OFF</Text>
      </View>

      {/* Coupon Info */}
      <View style={styles.infoContainer}>
        {/* Description */}
        <Text style={styles.description} numberOfLines={3}>
          {coupon.description}
        </Text>

        {/* Coupon Code */}
        <Text style={styles.code}>{coupon.code}</Text>
      </View>

      <View style={styles.separatorContainer}>
        <View style={styles.notchLeft} />

        {/* Dashed line */}
        {
          !coupon.isApplied && (
            <View style={styles.dashedLine} />
          )
        }

        <View style={styles.notchRight} />

      </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 154,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#E7E7E7',
    marginRight: 8,
    justifyContent: 'space-between',
  },
  badge: {
    position: 'absolute',
    top: -22,
    alignSelf: 'center',
    zIndex: 9999,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00ACC1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeAmount: {
    fontSize: 11,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    color: '#FFFFFF',
  },
  badgeText: {
    fontSize: 11,
    fontFamily: fontFamily.plusJakartaSansSemiBold,
    color: '#FFFFFF',
  },
  infoContainer: {
    paddingHorizontal: Spacing.md,
    paddingTop: 30,
    paddingBottom: Spacing.xs,
  },
  description: {
    fontSize: 8.6,
    color: '#989898',
    textAlign: 'center',
    marginBottom: 10,
    height: 32,
  },
  code: {
    fontSize: 10.4,
    color: Colors.black,
    textAlign: 'center',
    fontFamily: fontFamily.plusJakartaSansSemiBold,
  },
  separatorContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  notchLeft: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    position: 'absolute',
    top: 0,
    left: -8,
  },
  notchRight: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    position: 'absolute',
    top: 0,
    right: -8,
  },
  dashedLine: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D4D4D4',
  },
  button: {
    paddingVertical: 10,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButton: {
    backgroundColor: '#FFF',
  },
  appliedButton: {
    backgroundColor: '#FF9800',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  applyText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FF8024',
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
