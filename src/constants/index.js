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
  misc: {
    icon: 'folder',
    title: 'Misc',
    name: 'misc',
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
    }, {
      name: 'whale',
      file: './assets/sounds/animals/whale.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/whale.jpg`,
    }, {
      name: 'wolf',
      file: './assets/sounds/animals/wolf.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/wolf.jpg`,
    }, {
      name: 'deer',
      file: './assets/sounds/animals/deer.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/deer.jpg`,
    }, {
      name: 'zebra',
      file: './assets/sounds/animals/zebra.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/zebra.jpg`,
    }, {
      name: 'squirrel',
      file: './assets/sounds/animals/squirrel.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/squirrel.png`,
    }, {
      name: 'panda',
      file: './assets/sounds/animals/panda.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/panda.jpg`,
    }, {
      name: 'dolphin',
      file: './assets/sounds/animals/dolphin.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/dolphin.jpg`,
    }, {
      name: 'fox',
      file: './assets/sounds/animals/fox.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/animals/fox.jpg`,
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
    }, {
      name: 'kitten6',
      file: './assets/sounds/kittens/kitten6.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten6.jpg`,
    }, {
      name: 'kitten7',
      file: './assets/sounds/kittens/kitten7.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten7.jpg`,
    }, {
      name: 'kitten8',
      file: './assets/sounds/kittens/kitten8.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten8.jpg`,
    }, {
      name: 'kitten9',
      file: './assets/sounds/kittens/kitten9.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten9.jpg`,
    }, {
      name: 'kitten10',
      file: './assets/sounds/kittens/kitten10.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten10.jpg`,
    }, {
      name: 'kitten11',
      file: './assets/sounds/kittens/kitten11.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten11.jpg`,
    }, {
      name: 'kitten12',
      file: './assets/sounds/kittens/kitten12.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten12.jpg`,
    }, {
      name: 'kitten13',
      file: './assets/sounds/kittens/kitten13.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten13.jpg`,
    }, {
      name: 'kitten14',
      file: './assets/sounds/kittens/kitten14.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/kittens/kitten14.jpg`,
    },
  ],
  misc: [
    {
      name: 'cilantro',
      file: './assets/sounds/misc/cilantro.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/misc/cilantro.png`,
    }, {
      name: 'yodel',
      file: './assets/sounds/misc/yodel.mp3',
      uri: `${RNFS.MainBundlePath}/assets/images/misc/yodel.jpg`,
    },
  ],
}
