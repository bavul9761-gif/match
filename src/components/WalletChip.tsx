import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, typography } from '../theme/colors';

type Props = {
  coins: number;
  diamonds: number;
};

export function WalletChip({ coins, diamonds }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.chip}>
        <Text style={styles.label}>Coin</Text>
        <Text style={styles.value}>{format(coins)}</Text>
      </View>
      <View style={[styles.chip, styles.chipDiamond]}>
        <Text style={styles.label}>Elmas</Text>
        <Text style={styles.value}>{format(diamonds)}</Text>
      </View>
    </View>
  );
}

function format(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
  },
  chipDiamond: {
    backgroundColor: colors.bgElevated,
  },
  label: {
    ...typography.micro,
    color: colors.textMuted,
  },
  value: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '700',
  },
});
