# Emma Contacts Challenge

# Context and goal

I have done this application for an interview challenge for Emma. [Description](https://www.notion.so/React-Native-Engineering-challenge-cf7aa682c1c143d9b1bc73f17bb4f8a2)

## Preview

[Video](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8fcf2539-4fd5-4970-8abb-60444a3bd9a5/challenge.mov?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200926%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200926T065806Z&X-Amz-Expires=86400&X-Amz-Signature=0189a82a802e244441391439e24cbbfc6e91125a6ffbb184b9f8edc6a6ca6ee1&X-Amz-SignedHeaders=host)

## Main technologies used

- [React Native](https://github.com/facebook/react-native)

> A framework for building native apps with React.

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

## Running the project

- Clone this project
```
git clone < project-url.git >
```
If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

## Testing

We will use [Jest](https://facebook.github.io/jest/) testing library because it allows us to test both components and functions in an easy and efficient way.

To run the tests, execute ```yarn test``` in a terminal opened in the project folder.
If you want to re-test each time you modify a test file, run ```yarn run test:watch```. Jest will watch for file changes and relaunch the tests for you.
