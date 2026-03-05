import { Animated, StyleSheet, Text } from 'react-native';
import React from 'react';

interface Props {
  scrollY: Animated.Value;
  tab: { label: string; value: string };
  isActive: boolean;
  scrollRef?: React.RefObject<any>;
  setPagerScrollEnabled:any;
}

export const TabItem = (props: Props) => {
  const { scrollY, tab, isActive,setPagerScrollEnabled, scrollRef } = props;

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
      onScrollBeginDrag={() => setPagerScrollEnabled(false)} // 开始上下滚动，禁止左右
      onScrollEndDrag={() => setPagerScrollEnabled(true)} // 结束滚动，恢复左右
      scrollEventThrottle={16}
    >
      <Text style={styles.title}>{tab.label} Content</Text>
      {Array.from({ length: 50 }).map((_, index) => (
        <Text key={index} style={styles.item}>
          Item {index + 1}
        </Text>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
