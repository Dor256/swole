require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: () => null,
    FontAwesome5: () => null
  };
});
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('./src/common/logger', () => {
  return {
    logger: {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn()
    }
  };
});
