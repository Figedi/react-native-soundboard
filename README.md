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

1. Create a folder `assets`
2. Create subfolders containing images and sounds: `assets/images` and `assets/sounds`
3. Add sound- & image-files to your library, make sure the sound-basename matches the image-basename (used for autodiscovery)
  3.1 Make sure your asset folder has subdirectories, which correspond to your configured TABS
4. Add the assets-folder to your build-phase, e.g. in Xcode add it to `Copy Bundle Resources` or Rightclick + `Add Files to <projectname>`
5. Change in `Constants.js` the `VIEW_LIBRARY`. The first-level keys are your subfolders in `assets/sounds`
6. See development / production for running

## Development

Nothing special here, you can either use the provided npm-scripts or use xcode to run:
* With CLI: `npm run start` or `npm run debug` and `react-native run-ios`
* With Xcode: Open Project & Hit play


## Production

CLI:
1. Make sure to have installed `ios-deploy`
2. Change the name in the `release` npm-script to your iPhone's name
3. Run the `release` npm-script

XCode:
1. Configure your build-Scheme to `Release`
2. Hit play

## Features

- [x] Asynchronous Sound-playing through react-saga
- [x] Multiple Sounds through long-presses
- [x] Auto Discovery of assets
- [x] Custom Recorded Sounds with camera picture (e.g. "party-mode")
- [ ] Megaphone mode

## Contribute

If you want to contribute, feel free to issue a PR. I'm always open for new suggestions
