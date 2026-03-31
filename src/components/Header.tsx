import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';

export interface HeaderProps {
  /** Header title text */
  title?: string;
  /** Custom title component (overrides title prop) */
  titleComponent?: ReactNode;
  /** Title text style */
  titleStyle?: TextStyle;
  /** Left icon/component */
  leftIcon?: ReactNode;
  /** Right icon/component */
  rightIcon?: ReactNode;
  /** Handler for left icon press */
  onLeftPress?: (event: GestureResponderEvent) => void;
  /** Handler for right icon press */
  onRightPress?: (event: GestureResponderEvent) => void;
  /** Container style */
  style?: ViewStyle;
  /** Background color */
  backgroundColor?: string;
  /** Hide left icon (keeps spacing) */
  hideLeftIcon?: boolean;
  /** Hide right icon (keeps spacing) */
  hideRightIcon?: boolean;
  /** Icon container size */
  iconSize?: number;
  /** Number of lines for title */
  numberOfLines?: number;
  /** Test ID */
  testID?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  titleComponent,
  titleStyle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
  backgroundColor = Colors.background,
  hideLeftIcon = false,
  hideRightIcon = false,
  iconSize = 40,
  numberOfLines = 1,
  testID,
}) => {
  const iconContainerStyle = {
    width: iconSize,
    height: iconSize,
  };

  return (
    <View
      style={[styles.container, { backgroundColor }, style]}
      testID={testID}
    >
      {/* Left Icon */}
      <View style={[styles.iconContainer, iconContainerStyle]}>
        {!hideLeftIcon && leftIcon && (
          <Pressable
            onPress={onLeftPress}
            disabled={!onLeftPress}
            style={({ pressed }) => [
              styles.iconButton,
              { opacity: pressed && onLeftPress ? 0.6 : 1 },
            ]}
            hitSlop={8}
          >
            {leftIcon}
          </Pressable>
        )}
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        {titleComponent ? (
          titleComponent
        ) : (
          <Text
            style={[styles.title, titleStyle]}
            numberOfLines={numberOfLines}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        )}
      </View>

      {/* Right Icon */}
      <View style={[styles.iconContainer, iconContainerStyle]}>
        {!hideRightIcon && rightIcon && (
          <Pressable
            onPress={onRightPress}
            disabled={!onRightPress}
            style={({ pressed }) => [
              styles.iconButton,
              { opacity: pressed && onRightPress ? 0.6 : 1 },
            ]}
            hitSlop={8}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 56,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
  },
  title: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});
