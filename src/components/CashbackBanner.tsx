import { Typography } from '@/constants/typography';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';

export interface CashbackBannerProps {
  /** Amount needed to qualify for cashback */
  amountNeeded: number;
  /** Cashback percentage */
  cashbackPercentage: number;
  /** Custom message (overrides default) */
  message?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Container style */
  style?: ViewStyle;
  /** Currency symbol */
  currencySymbol?: string;
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Icon background color */
  iconBackgroundColor?: string;
}

/**
 * Cashback promotion banner component
 * Displays cashback offer with icon, amount needed, and conditions
 */
export const CashbackBanner: React.FC<CashbackBannerProps> = ({
  amountNeeded,
  cashbackPercentage,
  message,
  subtitle = 'No coupon needed',
  style,
  currencySymbol = '₹',
  backgroundColor = '#F5F9FF',
  borderColor = '#E3F2FD',
  iconBackgroundColor = '#2196F3',
}) => {
  const displayMessage =
    message ||
    `Add items worth ${currencySymbol}${amountNeeded} more to get ${cashbackPercentage}% cashback`;

  return (
    <View style={[styles.container, { backgroundColor, borderColor }, style]}>
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
        <View style={styles.iconBadge}>
          <Text style={styles.iconText}>💰</Text>
        </View>
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.message}>{displayMessage}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    ...Typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.body,
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
