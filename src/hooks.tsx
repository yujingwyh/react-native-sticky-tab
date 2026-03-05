import { createRef, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Animated, ScrollView } from 'react-native';

interface Options {
  total: number;
  space: number;
}

export const useSticky = (options: Options) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startValuesRef = useRef<Record<string, number>>({});
  const currentValuesRef = useRef<Record<string, number>>({});
  const items = useMemo(() => {
    return new Array(options.total).fill(0).map(() => {
      return {
        animate: new Animated.Value(0),
        element: createRef<ScrollView>(),
      };
    });
  }, [options.total]);
  const [currentAnimate, setCurrentAnimate] = useState(items[0].animate);

  const itemsRef = useRef(items);
  itemsRef.current = items;

  useLayoutEffect(() => {
    const ids = items.map((item, index) => {
      return item.animate.addListener(state => {
        currentValuesRef.current[index] = state.value;
      });
    });

    return () => {
      items.map((item, index) => {
        item.animate.removeListener(ids[index]);
      });
    };
  }, [options.total]);

  useLayoutEffect(() => {
    const current = itemsRef.current[currentIndex].animate;
    startValuesRef.current = { ...currentValuesRef.current };

    const id = current.addListener(state => {
      itemsRef.current.forEach((item, index) => {
        if (index !== currentIndex) {
          const startValue = startValuesRef.current[index] || 0;
          let currentValue: number = 0;

          if (state.value <= options.space) {
            if (startValue <= options.space) {
              currentValue = state.value;
            } else {
              currentValue = state.value;
            }
          } else {
            if (startValue <= options.space) {
              currentValue = options.space;
            } else {
              currentValue = startValue;
            }
          }

          console.log(state.value,currentValue);
          currentValuesRef.current[index] = currentValue;
          item.element.current?.scrollTo({ y: currentValue, animated: false });
        }
      });
    });

    setCurrentAnimate(current);

    return () => {
      current.removeListener(id);
    };
  }, [currentIndex]);

  return {
    items,
    currentAnimate,
    currentIndex,
    setCurrentIndex,
  };
};
