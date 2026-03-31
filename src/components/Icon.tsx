import { Image } from 'expo-image';
import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export type IconType = 'image' | 'vector' | 'custom';

export interface IconProps {
  /** Icon size in pixels */
  size?: number;
  /** Icon color (for vector icons) */
  color?: string;
  /** Press handler */
  onPress?: (event: GestureResponderEvent) => void;
  /** Image source (for image type) */
  source?: ImageSourcePropType;
  /** Vector icon component (e.g., from expo-vector-icons or react-native-vector-icons) */
  IconComponent?: ReactNode;
  /** Custom icon component */
  children?: ReactNode;
  /** Container style */
  style?: ViewStyle;
  /** Disabled state */
  disabled?: boolean;
  /** Hit slop for better touch target */
  hitSlop?: number;
  /** Background color */
  backgroundColor?: string;
  /** Border radius */
  borderRadius?: number;
  /** Test ID */
  testID?: string;
}

export const Icon: React.FC<IconProps> = ({
  size = 24,
  color = '#000000',
  onPress,
  source,
  IconComponent,
  children,
  style,
  disabled = false,
  hitSlop = 8,
  backgroundColor = 'transparent',
  borderRadius = 0,
  testID,
}) => {
  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    backgroundColor,
    borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const renderIcon = () => {
    // Priority: children > IconComponent > source
    if (children) {
      return children;
    }

    if (IconComponent) {
      return IconComponent;
    }

    if (source) {
      return (
        <Image
          source={source}
          style={[styles.image, { width: size, height: size, tintColor: color }]}
          resizeMode="contain"
        />
      );
    }

    return null;
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        hitSlop={hitSlop}
        testID={testID}
        style={({ pressed }) => [
          containerStyle,
          style,
          { opacity: pressed && !disabled ? 0.6 : 1 },
        ]}
      >
        {renderIcon()}
      </Pressable>
    );
  }

  return (
    <View style={[containerStyle, style]} testID={testID}>
      {renderIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
