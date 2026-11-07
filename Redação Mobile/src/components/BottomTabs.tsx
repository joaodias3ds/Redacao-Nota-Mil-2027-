import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import { colors } from '../theme';

const items = [
  { href: '/(tabs)/hoje', label: 'Hoje', key: 'hoje' },
  { href: '/(tabs)/feed', label: 'Feed', key: 'feed' },
  { href: '/(tabs)/evolucao', label: 'Evolução', key: 'evolucao' },
  { href: '/(tabs)/perfil', label: 'Perfil', key: 'perfil' },
] as const;

export function BottomTabs() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {items.map((item) => {
        const active = pathname.includes(item.key);
        return (
          <Pressable
            key={item.key}
            style={styles.item}
            onPress={() => router.replace(item.href)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <View style={[styles.dot, active && styles.dotActive]} />
            <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    paddingTop: 8,
    minHeight: 64,
  },
  item: { flex: 1, alignItems: 'center', gap: 4, minHeight: 48, justifyContent: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.brand },
  label: { fontSize: 12, color: colors.gray, fontWeight: '500' },
  labelActive: { color: colors.action, fontWeight: '700' },
});
