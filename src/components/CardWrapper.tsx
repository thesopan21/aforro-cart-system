import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BorderRadius, Colors, Shadows, Spacing } from '../constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface CardWrapperProps {
  children: ReactNode;
  /** Custom container style */
  style?: ViewStyle;
  /** Enable press animation (default: true) */
  enablePressAnimation?: boolean;
  /** Callback when card is pressed */
  onPress?: (event: GestureResponderEvent) => void;
  /** Shadow size: 'small' | 'medium' | 'large' */
  shadowSize?: 'small' | 'medium' | 'large';
  /** Border radius size */
  borderRadius?: number;
  /** Padding inside the card */
  padding?: number;
  /** Background color */
  backgroundColor?: string;
  /** Disable card interaction */
  disabled?: boolean;
  /** Test ID for testing */
  testID?: string;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  style,
  enablePressAnimation = true,
  onPress,
  shadowSize = 'medium',
  borderRadius = 16,
  padding = 16,
  backgroundColor = '#FFFFFF',
  disabled = false,
  testID,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    if (enablePressAnimation && !disabled) {
      scale.value = withSpring(0.97, {
        damping: 15,
        stiffness: 300,
      });
      opacity.value = withTiming(0.9, { duration: 150 });
    }
  };

  const handlePressOut = () => {
    if (enablePressAnimation && !disabled) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
      opacity.value = withTiming(1, { duration: 150 });
    }
  };

  const cardStyle: ViewStyle = {
    backgroundColor,
    borderRadius,
    padding,
    boxShadow: '0px 0px 15.2px 0px #6262621F',
  };

  if (onPress && !disabled) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        testID={testID}
        style={[styles.card, cardStyle, style, animatedStyle]}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <Animated.View
      testID={testID}
      style={[styles.card, cardStyle, style, !onPress && animatedStyle]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});
