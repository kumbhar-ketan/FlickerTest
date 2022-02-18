module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          screens: './src/screens',
          services: './src/services',
          navigations: './src/navigations',
          components: './src/components',
        },
      },
    ],
  ],
};
