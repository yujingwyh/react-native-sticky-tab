import { Animated, StatusBar, StyleSheet, View } from 'react-native';
import PagerView, { PagerViewProps } from 'react-native-pager-view';
import { TabBar, tabItems } from './tab-bar.tsx';
import React, { useEffect, useRef, useState } from 'react';
import { TabItem } from './tab-item.tsx';
import { Header } from './header.tsx';
import { useSticky } from './hooks.tsx';

export const App = () => {
  const pagerViewRef = useRef<PagerView>(null);
  const [pagerScrollEnabled, setPagerScrollEnabled] = useState(true);
  const sticky = useSticky({
    total:2,
    space:200
  });

  const onTabChange = (index: number) => {
    sticky.setCurrentIndex(index);
    pagerViewRef.current?.setPage(index);
  };

  const onPageSelected: PagerViewProps['onPageSelected'] = event => {
    const newIndex = event.nativeEvent.position;
    sticky.setCurrentIndex(newIndex);
  };

  return (
    <React.Fragment>
      <StatusBar hidden />
      <Header scrollY={sticky.currentAnimate} />
      <TabBar
        scrollY={sticky.currentAnimate}
        activeIndex={sticky.currentIndex}
        onTabChange={onTabChange}
      />
      <PagerView
        ref={pagerViewRef}
        style={styles.pagerView}
        initialPage={sticky.currentIndex}
        scrollEnabled={pagerScrollEnabled}
        onPageSelected={onPageSelected}
      >
        {tabItems.map((tab, index) => (
          <View key={tab.value}>
            <TabItem
              scrollY={sticky.items[index].animate}
              scrollRef={sticky.items[index].element}
              setPagerScrollEnabled={setPagerScrollEnabled}
              tab={tab}
              isActive={sticky.currentIndex === index}
            />
          </View>
        ))}
      </PagerView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    height: '100%',
  },
});
