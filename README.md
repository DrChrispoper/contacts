# Emma Contacts Challenge

# Context and goal

I have done this application for an interview challenge for Emma. [Description](https://www.notion.so/React-Native-Engineering-challenge-cf7aa682c1c143d9b1bc73f17bb4f8a2)


## Main technologies used

- [React Native](https://github.com/facebook/react-native)

> A framework for building native apps with React.

- [Reanimated2](https://github.com/software-mansion/react-native-reanimated)

> React Native's Animated library reimplemented.

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

## Running the project

- Clone this project

Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn.
#### `yarn`

### `expo start`

Starts expo from where you can run the app.

#### `yarn start`

Runs your app in development mode.

#### `yarn test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `yarn ios`

Like `yarn start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `yarn android`

Like `yarn start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:


## Testing

We are use [Jest](https://facebook.github.io/jest/) testing library.

To run the tests, execute ```yarn test``` in a terminal opened in the project folder.
If you want to re-test each time you modify a test file, run ```yarn run test:watch```. Jest will watch for file changes and relaunch the tests for you.

## TODO

- [x] Initial Setup
- [x] Vertical List of Text elements
- [x] Text to JSON
- [x] Horizontal List of Images
- [x] Link Image to Text
- [x] Link scrolling
- [x] Detail View on Image Tap
