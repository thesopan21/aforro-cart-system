import React from 'react';
import { 
   StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../constants/theme';
import { appAssets } from '@/assets/images';
import { ImageBackground } from 'expo-image';

export interface DiscountBadgeProps {
  /** Discount percentage (e.g., 52 for "52% OFF") */
  discount: number;
  /** Custom style */
  style?: ViewStyle;
  /** Badge size */
  size?: 'small' | 'medium' | 'large';
  /** Badge position when used with absolute positioning */
  position?: 'top-left' | 'top-right';
}

/**
 * DiscountBadge component for displaying discount percentage
 * Uses ImageBackground with overlaid text for discount display
 */
export const DiscountBadge: React.FC<DiscountBadgeProps> = ({
  discount,
  style,
  size = 'medium',
  position = 'top-left',
}) => {
  const containerStyles = [
    styles.container,
    position === 'top-left' && styles.topLeft,
    position === 'top-right' && styles.topRight,
    style,
  ];

  const badgeStyles = [
    styles.badge,
    size === 'small' && styles.smallBadge,
    size === 'medium' && styles.mediumBadge,
    size === 'large' && styles.largeBadge,
  ];

  const textStyles = [
    styles.text,
    size === 'small' && styles.smallText,
    size === 'medium' && styles.mediumText,
    size === 'large' && styles.largeText,
  ];

  // If imageSource is provided, use ImageBackground, otherwise use colored View
    return (
      <View style={containerStyles}>
        <ImageBackground
          source={appAssets.discountBadgeSVG}
          style={badgeStyles}
          contentFit="contain"
        >
          <Text style={textStyles}>{discount}%</Text>
          <Text style={textStyles}>OFF</Text>
        </ImageBackground>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    zIndex: 1,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBadge: {
    width: 30,
    height: 34,
  },
  mediumBadge: {
    width: 55,
    height: 65,
  },
  largeBadge: {
    width: 65,
    height: 75,
  },
  topLeft: {
    top: Spacing.sm,
    left: Spacing.sm,
  },
  topRight: {
    top: Spacing.sm,
    right: Spacing.sm,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 16,
  },
  smallText: {
    fontSize: 8,
    lineHeight: 12,
  },
  mediumText: {
    fontSize: 11,
    lineHeight: 16,
  },
  largeText: {
    fontSize: 13,
    lineHeight: 20,
  },
});
