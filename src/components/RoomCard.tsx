import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors, radii, typography } from '../theme/colors';
import type { Room } from '../types/models';

const MODE_LABEL: Partial<Record<Room['mode'], string>> = {
  party: 'Party',
  dating: 'Dating',
  karaoke: 'Karaoke',
  private: 'Private',
};

type Props = {
  room: Room;
  onPress: () => void;
};

export function RoomCard({ room, onPress }: Props) {
  const modeLabel = MODE_LABEL[room.mode] ?? null;

  return (
    <Pressable onPress={onPress} style={styles.press}>
      <View style={styles.card}>
        <View style={styles.top}>
          <Text style={styles.liveText}>LIVE</Text>
          {modeLabel ? <Text style={styles.mode}>{modeLabel}</Text> : null}
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {room.title}
        </Text>
        {room.topic ? (
          <Text style={styles.topic} numberOfLines={1}>
            {room.topic}
          </Text>
        ) : null}

        <View style={styles.bottom}>
          <Text style={styles.host} numberOfLines={1}>
            {room.host?.display_name ?? 'Host'}
          </Text>
          <Text style={styles.metaText}>{room.listener_count}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press: {
    flex: 1,
    minWidth: '47%',
  },
  card: {
    borderRadius: radii.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
    minHeight: 168,
    justifyContent: 'space-between',
    gap: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveText: {
    ...typography.micro,
    color: colors.primarySoft,
  },
  mode: {
    ...typography.micro,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  topic: {
    ...typography.caption,
    color: colors.textMuted,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  host: {
    ...typography.caption,
    color: colors.textMuted,
    flex: 1,
  },
  metaText: {
    ...typography.caption,
    color: colors.text,
  },
});
