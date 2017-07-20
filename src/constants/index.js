import RNFS from 'react-native-fs';

export const SOUND = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  PLAY_BEGIN: 'PLAY_BEGIN',
  PLAY_BEGIN_LONG: 'PLAY_BEGIN_LONG',
  PLAY_END: 'PLAY_END',
  PLAY_ERROR: 'PLAY_ERROR',
};

export const RECORD = {
  START: 'RECORD_START',
  PROGRESS: 'RECORD_PROGRESS',
  PRESS_OUT: 'RECORD_PRESS_OUT',
  PRESS_IN: 'RECORD_PRESS_IN',
  FINISHED: 'RECORD_FINISHED',
  IMAGE: 'RECORD_IMAGE',
  ERROR: 'RECORD_ERROR',
  RESET: 'RECORD_RESET',
};

export const RECORD_STATES = {
  START: 'RECORD_STATES_START',
  PROGRESS: 'RECORD_STATES_PROGRESS',
  FINISHED: 'RECORD_STATES_FINISHED',
  ERROR: 'RECORD_STATES_ERROR',
};

export const LIBRARY = {
  REQUEST_UPDATE: 'LIBRARY_REQUEST_UPDATE',
  UPDATE: 'LIBRARY_UPDATE',
  REMOVE_ALL_RECORDS: 'LIBRARY_REMOVE_ALL_RECORDS',
  REMOVE_RECORD: 'LIBRARY_REMOVE_RECORD',
  REMOVE_RECORDS: 'LIBRARY_REMOVE_RECORDS',
  MOVE_IMAGE: 'LIBRARY_MOVE_IMAGE',
};

export const VIEW = {
  SELECT: 'VIEW_SELECT',
  SET: 'VIEW_SET',
};

export const SOURCES = {
  PRESS: 'PRESS',
  LONGPRESS: 'LONGPRESS',
};

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
};

export const PATHS = {
  sounds: `${RNFS.MainBundlePath}/assets`,
  records: `${RNFS.DocumentDirectoryPath}/assets`,
};
