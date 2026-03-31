import { Typography } from '@/constants/typography';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BorderRadius, Spacing } from '../constants/theme';

export type AlertType = 'warning' | 'info' | 'error' | 'success';

export interface AlertBannerProps {
  /** Alert message(s) - can be string or array of strings */
  message: string | string[];
  /** Alert type - determines default colors and icon */
  type?: AlertType;
  /** Custom icon (overrides default icon for type) */
  icon?: string;
  /** Container style */
  style?: ViewStyle;
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Text color */
  textColor?: string;
  /** Icon color */
  iconColor?: string;
}

// Default theme for each alert type
const ALERT_THEMES = {
  warning: {
    icon: '⚠',
    backgroundColor: '#FFFBF0',
    borderColor: '#F5C842',
    textColor: '#856404',
    iconColor: '#F5C842',
  },
  info: {
    icon: 'ℹ',
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    textColor: '#0D47A1',
    iconColor: '#2196F3',
  },
  error: {
    icon: '✕',
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
    textColor: '#C62828',
    iconColor: '#F44336',
  },
  success: {
    icon: '✓',
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    textColor: '#2E7D32',
    iconColor: '#4CAF50',
  },
};

/**
 * Reusable alert banner component for displaying warnings, info, errors, or success messages
 * Supports single or multiple message lines
 */
export const AlertBanner: React.FC<AlertBannerProps> = ({
  message,
  type = 'warning',
  icon,
  style,
  backgroundColor,
  borderColor,
  textColor,
  iconColor,
}) => {
  const theme = ALERT_THEMES[type];
  const displayIcon = icon || theme.icon;
  const messages = Array.isArray(message) ? message : [message];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor || theme.backgroundColor,
          borderColor: borderColor || theme.borderColor,
        },
        style,
      ]}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: iconColor || theme.iconColor },
          ]}
        >
          <Text style={styles.iconText}>{displayIcon}</Text>
        </View>
      </View>

      {/* Message(s) */}
      <View style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={[
              styles.messageText,
              { color: textColor || theme.textColor },
              index > 0 && styles.messageTextSpacing,
            ]}
          >
            {msg}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: Spacing.sm,
    paddingTop: 2,
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  messageContainer: {
    flex: 1,
    paddingTop: 2,
  },
  messageText: {
    ...Typography.body,
    fontSize: 13,
    lineHeight: 18,
  },
  messageTextSpacing: {
    marginTop: 2,
  },
});
