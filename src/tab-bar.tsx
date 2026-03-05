import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useMemo } from 'react';

interface Props {
  activeIndex: number;
  onTabChange: (activeIndex: number) => void;
  scrollY: Animated.Value;
}

export const tabItems = [
  { label: 'One', value: 'One' },
  { label: 'Two', value: 'Two' },
];

export const TabBar = (props: Props) => {
  const { activeIndex, onTabChange, scrollY } = props;

  const translateY = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [0, -200],
        extrapolate: 'clamp',
      }),
    [scrollY],
  );

  return (
    <Animated.View style={[styles.tabBar, { transform: [{ translateY }] }]}>
      {tabItems.map((tab, index) => (
        <TouchableOpacity
          key={tab.value}
          style={[styles.tab, activeIndex === index && styles.activeTab]}
          onPress={() => onTabChange(index)}
        >
          <Text
            style={[styles.tabText, activeIndex === index && styles.activeText]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    backgroundColor: '#fff',
    top: 200,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 3,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
