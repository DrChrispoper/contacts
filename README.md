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

### 0. Requirements

You will need the expo cli installed to run the project. To install the expo cli you can run this command:
#### `yarn global add expo-cli`

To run the project on your physical phone, you need to install the Expo Client app:

[Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

[App Store](https://apps.apple.com/us/app/expo-client/id982107779)

### 1. Clone this project

The first step for running the code is to get it to your computer.
You can clone this repo using the following command:

#### `git clone https://github.com/DrChrispoper/contactsChallenge.git`

Or download the archive of the release zip. [Release 1.0](https://github.com/DrChrispoper/contactsChallenge/releases/tag/v1.0)

### 2. Install depencies

The second step is to install the project depencies. You can do that using Yarn with the following command:

#### `yarn`

### 3. Launch expo

To start expo run the following command:

### `expo start`

When you run `expo start`, Expo CLI starts Metro Bundler, which is an HTTP server that compiles the JavaScript code of our app using Babel and serves it to the Expo app. 
It also pops up Expo Dev Tools in your browser, a graphical interface for Expo CLI.

### 4. Preview the project

#### Physical Devices
Open the Expo development client on your device. 
Scan the QR code printed by expo start with Expo Client (Android) or Camera (iOS). You may have to wait a minute while your project bundles and loads for the first time.

#### Simulator 
Open the Expo Dev Tools on your browser.
In the left side menu you can click on 'Run on Android/iOS simulator' to launch the project in the simulator.

## Testing

We are use [Jest](https://facebook.github.io/jest/) testing library.

To run the tests, execute ```yarn test``` in a terminal opened in the project folder.
Jest will test components and make sure that changes that have been made in the code do not break how they are displayed. 
