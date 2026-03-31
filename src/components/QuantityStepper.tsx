import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing, } from '../constants/theme';
import { Typography } from '@/constants/typography';

export interface QuantityStepperProps {
  /** Current quantity value */
  value: number;
  /** Handler for increment */
  onIncrease?: () => void;
  /** Handler for decrement */
  onDecrease?: () => void;
  /** Minimum value (default: 0) */
  min?: number;
  /** Maximum value (default: 99) */
  max?: number;
  /** Custom style */
  style?: ViewStyle;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
}

/**
 * QuantityStepper component for incrementing/decrementing quantities
 * Displays minus button, current value, and plus button
 */
export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onIncrease,
  onDecrease,
  min = 0,
  max = 99,
  style,
  disabled = false,
  size = 'medium',
}) => {
  const isMinDisabled = disabled || value <= min;
  const isMaxDisabled = disabled || value >= max;

  const handleDecrease = () => {
    if (!isMinDisabled && onDecrease) {
      onDecrease();
    }
  };

  const handleIncrease = () => {
    if (!isMaxDisabled && onIncrease) {
      onIncrease();
    }
  };

  const containerStyles = [
    styles.container,
    size === 'small' && styles.smallContainer,
    size === 'medium' && styles.mediumContainer,
    size === 'large' && styles.largeContainer,
    style,
  ];

  const buttonStyles = [
    styles.button,
    size === 'small' && styles.smallButton,
    size === 'medium' && styles.mediumButton,
    size === 'large' && styles.largeButton,
  ];

  const textStyles = [
    styles.valueText,
    size === 'small' && styles.smallText,
    size === 'medium' && styles.mediumText,
    size === 'large' && styles.largeText,
  ];

  const iconStyles = [
    styles.iconText,
    size === 'small' && styles.smallIcon,
    size === 'medium' && styles.mediumIcon,
    size === 'large' && styles.largeIcon,
  ];

  return (
    <View style={containerStyles}>
      {/* Decrease Button */}
      <Pressable
        style={({ pressed }) => [
          ...buttonStyles,
          isMinDisabled && styles.disabledButton,
          pressed && !isMinDisabled && styles.pressedButton,
        ]}
        onPress={handleDecrease}
        disabled={isMinDisabled}
      >
        <Text
          style={[iconStyles, isMinDisabled && styles.disabledText]}
        >
          −
        </Text>
      </Pressable>

      {/* Value Display */}
      <View style={styles.valueContainer}>
        <Text style={textStyles}>{value}</Text>
      </View>

      {/* Increase Button */}
      <Pressable
        style={({ pressed }) => [
          ...buttonStyles,
          isMaxDisabled && styles.disabledButton,
          pressed && !isMaxDisabled && styles.pressedButton,
        ]}
        onPress={handleIncrease}
        disabled={isMaxDisabled}
      >
        <Text
          style={[iconStyles, isMaxDisabled && styles.disabledText]}
        >
          +
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
  },
  smallContainer: {
    borderRadius: BorderRadius.sm,
  },
  mediumContainer: {
    borderRadius: BorderRadius.md,
  },
  largeContainer: {
    borderRadius: BorderRadius.lg,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  smallButton: {
    width: 28,
    height: 28,
  },
  mediumButton: {
    width: 36,
    height: 36,
  },
  largeButton: {
    width: 44,
    height: 44,
  },
  disabledButton: {
    opacity: 0.3,
  },
  pressedButton: {
    backgroundColor: 'rgba(86, 135, 75, 0.1)',
  },
  valueContainer: {
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
  },
  valueText: {
    color: Colors.text,
    fontWeight: '600',
  },
  smallText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  mediumText: {
    ...Typography.body,
    fontWeight: '600',
  },
  largeText: {
    ...Typography.h3,
    fontWeight: '600',
  },
  iconText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  smallIcon: {
    fontSize: 16,
  },
  mediumIcon: {
    fontSize: 20,
  },
  largeIcon: {
    fontSize: 24,
  },
  disabledText: {
    color: Colors.textSecondary,
  },
});
