import { omit } from 'lodash';

import { SOUND } from '../constants';
/**
 * current: [
 * {
 *   name: <String>,
 *   file: <String>,
 *   $sound: <react-native-sound>,
 *   playing: <Bool>,
 *   meta: <Object> // additional meta information
 * }
 * ]
 */
const INITIAL_STATE = {
  playing: false,
  current: {},
};

function playSong(state, name, file, $sound, meta) {
  if (!state.current[name]) {
    // if it doesnt exist yet, add to state
    return {
      ...state,
      current: {
        ...state.current,
        [name]: {
          name,
          file,
          meta,
          $sound,
          playing: true,
        },
      },
    };
  }
  return state;
}

function pauseSong(state, name) {
  if (!state.current[name]) {
    return state;
  }
  return {
    ...state,
    current: {
      ...state.current,
      [name]: {
        ...state.current[name],
        playing: false,
      },
    },
  };
}

function resumeSong(state, name) {
  if (!state.current[name]) {
    return state;
  }
  return {
    ...state,
    current: {
      ...state.current,
      [name]: {
        ...state.current[name],
        playing: true,
      },
    },
  };
}

function playSongEnd(state, name) {
  if (!state.current[name]) {
    return state;
  }
  return {
    ...state,
    current: omit(state.current, [name]),
  };
}

function playError(state, name, error) {
  if (!state.current[name]) {
    return state;
  }
  return {
    ...state,
    current: {
      ...state.current,
      [name]: {
        ...state.current[name],
        playing: false,
        error,
      },
    },
  };
}

export default function setSoundState(state = INITIAL_STATE, action) {
  if (action.type === SOUND.PLAY) {
    return playSong(state, action.name, action.file, action.sound, action.meta);
  } else if (action.type === SOUND.PAUSE) {
    return pauseSong(state, action.name);
  } else if (action.type === SOUND.RESUME) {
    return resumeSong(state, action.name);
  } else if (action.type === SOUND.PLAY_END) {
    return playSongEnd(state, action.name);
  } else if (action.type === SOUND.PLAY_ERROR) {
    return playError(state, action.name, action.error);
  }
  return state;
}
