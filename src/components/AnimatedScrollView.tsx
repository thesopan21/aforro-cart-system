import React, { ReactNode } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  Extrapolate,
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedScrollViewComponent = Animated.createAnimatedComponent(ScrollView);

export interface AnimatedScrollViewProps extends ScrollViewProps {
  children: ReactNode;
  /** Enable header fade animation based on scroll */
  enableHeaderFade?: boolean;
  /** Custom header component that will animate */
  header?: ReactNode;
  /** Scroll threshold for header animation (default: 100) */
  headerFadeThreshold?: number;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Callback with scroll position */
  onScrollPosition?: (position: number) => void;
}

export const AnimatedScrollView: React.FC<AnimatedScrollViewProps> = ({
  children,
  enableHeaderFade = false,
  header,
  headerFadeThreshold = 100,
  containerStyle,
  onScrollPosition,
  ...scrollViewProps
}) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      if (onScrollPosition) {
        onScrollPosition(event.contentOffset.y);
      }
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!enableHeaderFade) return {};

    const opacity = interpolate(
      scrollY.value,
      [0, headerFadeThreshold / 2, headerFadeThreshold],
      [1, 0.5, 0],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, headerFadeThreshold],
      [0, -20],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <AnimatedScrollViewComponent
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      bounces={true}
      style={[styles.scrollView, containerStyle]}
      {...scrollViewProps}
    >
      {enableHeaderFade && header && (
        <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
          {header}
        </Animated.View>
      )}
      {children}
    </AnimatedScrollViewComponent>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
  },
});
