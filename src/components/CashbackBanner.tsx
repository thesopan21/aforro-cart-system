import { Typography } from '@/constants/typography';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { Image } from 'expo-image';
import { appAssets } from '@/assets/images';

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
  backgroundColor = '#FFFFFF',
  borderColor = '#E0E0E0',
  iconBackgroundColor = '#1E88E5',
}) => {
  const displayMessage =
    message ||
    `Add items worth ${currencySymbol}${amountNeeded} more to get ${cashbackPercentage}% cashback`;

  return (
    <View style={[styles.container]}>
      {/* Icon */}
      <View style={styles.iconWrapper}>
        <Image
          source={appAssets.cashBackOfferIcon}
          style={styles.icon}
        />
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
    gap: Spacing.md,
  },
  iconWrapper: {
    position: 'relative',
    width: 56,
    height: 56,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextTop: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  iconTextBottom: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginTop: -2,
  },
  indicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
  },
  message: {
    ...Typography.body,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
