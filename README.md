# Multi-Tab Sticky Header Scroll Sync

![Demo](./9f4054b7e72fd30bb760d17005424497.mp4)

## Requirements

1. When switching to tab one, the header position remains unchanged
2. When switching to tab one, the scroll position restores to item 10

## Implementation

* Use a separate `headerAnimate` to drive the header. When switching to tab one, the content scrolls back to item 10
* When scrolling up, the header moves up accordingly. When scrolling down, the header only moves down once the content reaches the top
* React Native's `Animated.Value` cannot achieve this kind of custom sync, and using `addListener` causes jank

`react-native-reanimated` can solve this, but it has a bug on Android that requires enabling React Native's experimental release level — [see here](https://docs.swmansion.com/react-native-reanimated/docs/guides/feature-flags/#disable_commit_pausing_mechanism). That's too risky for us.

How can I implement this?
