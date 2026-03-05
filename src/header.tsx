import { Animated, StyleSheet, Text } from 'react-native';
import React, { useMemo } from 'react';

interface Props {
  scrollY: Animated.Value;
}

export const Header = (props: Props) => {
  const { scrollY } = props;

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
    <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
      <Text style={styles.headerText}>Header</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 2,
    backgroundColor: '#00f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
});