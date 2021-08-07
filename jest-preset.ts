const expoPreset = require('react-native/jest-preset');

module.exports = Object.assign({}, expoPreset, {
  setupFiles: [require.resolve('./save-promise.ts')]
    .concat(expoPreset.setupFiles)
    .concat([require.resolve('./restore-promise.ts')])
});
