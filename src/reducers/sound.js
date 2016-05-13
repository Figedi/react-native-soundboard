import { SOUND } from '../constants';

const INITIAL_STATE = {
  playing: false,
  current: {
    name: null,
  },
};

function playSong(state, name) {
  if (name !== state.current.name) { // if name changes, stop player and start playing other song
    return {
      ...state,
      playing: true,
      current: {
        name,
      },
    }
  }
  // if its the same, do a toggle
  if (state.playing) {
    return {
      ...state,
      playing: false,
    }
  } else {
    return {
      ...state,
      playing: true,
      current: {
        name,
      },
    }
  }
}

function playSongEnd(state) {
  return {
    ...state,
    playing: false,
    current: {
      name: null,
    },
  }
}

function playError(state, error) {
  return {
    ...state,
    playing: false,
    current: {
      name: null,
      error,
    },
  }
}


export default function setState(state = INITIAL_STATE, action) {
  if (action.type === SOUND.PLAY) {
    return playSong(state, action.name);
  } else if (action.type === SOUND.PLAY_END) {
    return playSongEnd(state);
  } else if (action.type === SOUND.PLAY_ERROR) {
    return playError(state, action.error);
  }
  return state;
}
