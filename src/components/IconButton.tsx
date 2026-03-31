import React from 'react';
import { ImageSourcePropType, StyleSheet, Text } from 'react-native';
import { Icon, IconProps } from './Icon';

// Icon types available
export type IconName = 'back' | 'share' | 'menu' | 'search' | 'close' | 'add' | 'remove' | 'heart' | 'cart';

// Default icon symbols/text for each icon type
const DEFAULT_ICONS: Record<IconName, string> = {
  back: '←',
  share: '⤴',
  menu: '☰',
  search: '🔍',
  close: '×',
  add: '+',
  remove: '−',
  heart: '♡',
  cart: '🛒',
};

export interface IconButtonProps extends Omit<IconProps, 'children' | 'IconComponent' | 'source'> {
  /** Icon name/type to display */
  name: IconName;
  /** Vector icon component (e.g., <Ionicons name="arrow-back" />) - overrides default */
  VectorIcon?: React.ReactNode;
  /** Image source for custom icon - overrides default */
  imageSource?: ImageSourcePropType;
}

/**
 * Reusable IconButton component with predefined icon types
 * Supports default text icons, vector icons, or custom images
 */
export const IconButton: React.FC<IconButtonProps> = ({
  name,
  size = 24,
  color = '#212121',
  VectorIcon,
  imageSource,
  ...iconProps
}) => {
  // Priority: VectorIcon > imageSource > default

  // If vector icon provided, use it
  if (VectorIcon) {
    return (
      <Icon size={size} color={color} {...iconProps}>
        {VectorIcon}
      </Icon>
    );
  }

  // If image source provided, use it
  if (imageSource) {
    return <Icon size={size} color={color} source={imageSource} {...iconProps} />;
  }

  // Default: Use predefined text/symbol icon
  const iconSymbol = DEFAULT_ICONS[name];

  return (
    <Icon size={size} color={color} {...iconProps}>
      <Text style={[styles.iconText, { fontSize: size * 0.75, color }]}>
        {iconSymbol}
      </Text>
    </Icon>
  );
};

const styles = StyleSheet.create({
  iconText: {
    fontWeight: '400',
  },
});
