import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { BottomTabs } from '../../src/components/BottomTabs';
import { colors } from '../../src/theme';

export default function TabsLayout() {
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Slot />
      </View>
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  content: { flex: 1 },
});
