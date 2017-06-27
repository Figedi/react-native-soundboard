# react-native-soundboard

A Soundboard written in React-Native and redux-saga.

## Example Screen

Here's an example of the soundboard-app, obviously with cat-tax:

![N|Preview](http://i.imgur.com/GRgYMjy.png)


## Install

1. Run `npm install` to install all deps
2. Make sure you have installed the react-native-cli
3. Link dependencies with react-native-cli: `react-native link`

## Adding content

In order to add content to be able to actually play sounds, you need to add some to your asset library:

1. Create a folder, e.g. `assets`
2. Create subfolders containing images and sounds, e.g. `assets/images` and `assets/sounds`
3. Add sound- & image-files to your library
4. Reference them in `src/constants`, the current structure is available there, just mimic the structure
5. Add the assets-folder to your build-phase, e.g. in XCode add it to `Copy Bundle Resources`
6. Rebuild and play in the app

## Development

This project doesn't utilize any special development workflow. Thus, you can start the RN-Bundler-dev-server with `npm run start` and build for the simulator with `react-native run-ios`.

## Production

This app isn't really tested for heavy use, although it is successfully tested on various festivals. In order to run your app locally on your device, follow the official [React-Native-Guidelines](http://facebook.github.io/react-native/releases/0.36/docs/running-on-device-ios.html)

## Features

- [x] Asynchronous Sound-playing through react-saga
- [x] Multiple Sounds through long-presses
- [x] Auto Discovery of assets
- [ ] Megaphone mode
- [ ] Custom Recorded Sounds with camera picture (e.g. "party-mode")

## Contribute

If you want to contribute, feel free to issue a PR. I'm always open for new suggestions
