import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { BorderRadius, Colors, Spacing } from '../constants/theme';
import { Typography } from '@/constants/typography';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';


export interface OptionButtonProps {
  /** Button text (e.g., "2 options") */
  text: string;
  /** Press handler */
  onPress?: () => void;
  /** Show dropdown chevron */
  showChevron?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style */
  style?: ViewStyle;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Full width button */
  fullWidth?: boolean;
}

/**
 * OptionButton component for displaying selectable options
 * Displays text with an optional dropdown chevron icon
 */
export const OptionButton: React.FC<OptionButtonProps> = ({
  text,
  onPress,
  showChevron = true,
  disabled = false,
  style,
  variant = 'primary',
  fullWidth = false,
}) => {
  const buttonStyles = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyles}>{text}</Text>
      {showChevron && <Feather name="chevron-down" size={20} color="#FFFFFF" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: 2,
    boxShadow: '0px 0px 16px 0px #0000001F'
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.textSecondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    ...Typography.body,
    fontWeight: '600',
  },
  primaryText: {
    color: Colors.background,
  },
  secondaryText: {
    color: Colors.background,
  },
  outlineText: {
    color: Colors.primary,
  },
  disabledText: {
    color: Colors.textSecondary,
  },
});
