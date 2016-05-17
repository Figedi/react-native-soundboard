import RNFS from 'react-native-fs';

export const SOUND = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  PLAY_BEGIN: 'PLAY_BEGIN',
  PLAY_BEGIN_LONG: 'PLAY_BEGIN_LONG',
  PLAY_END: 'PLAY_END',
  PLAY_ERROR: 'PLAY_ERROR',
}

export const VIEW = {
  SELECT: 'SELECT',
  SET: 'SET',
}

export const VIEW_LIBRARY = {
  animals: {
    icon: 'paw',
    title: 'Animals',
    name: 'animals',
  },
  kittens: {
    icon: 'github-alt',
    title: 'Kittens',
    name: 'kittens',
  },
}

export const SOUND_LIBRARY = {
  animals: [
    {
      name: 'chicken',
      file: './assets/sounds/animals/chicken.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/chicken.png`,
    }, {
      name: 'cock',
      file: './assets/sounds/animals/cock.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/cock.jpg`,
    }, {
      name: 'cow',
      file: './assets/sounds/animals/cow.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/cow.jpg`,
    }, {
      name: 'elephant',
      file: './assets/sounds/animals/elephant.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/elephant.jpg`,
    }, {
      name: 'horse',
      file: './assets/sounds/animals/horse.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/horse.jpg`,
    }, {
      name: 'mosquito',
      file: './assets/sounds/animals/mosquito.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/mosquito.jpg`,
    }, {
      name: 'mule',
      file: './assets/sounds/animals/mule.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/mule.jpg`,
    }, {
      name: 'owl',
      file: './assets/sounds/animals/owl.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/owl.jpg`,
    }, {
      name: 'sheep',
      file: './assets/sounds/animals/sheep.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/sheep.jpg`,
    }, {
      name: 'woodpecker',
      file: './assets/sounds/animals/woodpecker.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/woodpecker.jpg`,
    }, {
      name: 'gorilla',
      file: './assets/sounds/animals/gorilla.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/gorilla.jpg`,
    },
  ],
  kittens: [
    {
      name: 'cat',
      file: './assets/sounds/kittens/cat.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/cat.jpg`,
    }, {
      name: 'kitten',
      file: './assets/sounds/kittens/kitten.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten.jpg`,
    }, {
      name: 'kitten2',
      file: './assets/sounds/kittens/kitten2.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten2.jpg`,
    }, {
      name: 'kitten3',
      file: './assets/sounds/kittens/kitten3.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten3.jpg`,
    }, {
      name: 'kitte4',
      file: './assets/sounds/kittens/kitten4.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten4.jpg`,
    }, {
      name: 'kitten5',
      file: './assets/sounds/kittens/kitten5.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten5.jpg`,
    },
  ],
}
