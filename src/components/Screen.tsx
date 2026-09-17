import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type Props = ViewProps & {
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  /** Feed ekranlari: gradient/desen yok, duz renk */
  solidBackground?: boolean;
};

export function Screen({
  children,
  style,
  edges = ['top', 'bottom'],
  solidBackground = false,
  ...rest
}: Props) {
  return (
    <View style={[styles.root, solidBackground && styles.solidRoot]}>
      {solidBackground ? null : (
        <LinearGradient colors={[...colors.gradientNight]} style={StyleSheet.absoluteFill} />
      )}
      <SafeAreaView style={[styles.safe, style]} edges={edges} {...rest}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  solidRoot: {
    backgroundColor: colors.bg,
  },
  safe: {
    flex: 1,
  },
});
