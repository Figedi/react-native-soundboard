import { find, merge, remove } from 'lodash';

import { SOUND } from '../constants';
/**
 * current: [
 * {
 * name: <String>,
 * file: <String>,
 * $sound: <react-native-sound>,
 * playing: <Bool>,
 * }
 * ]
 */
const INITIAL_STATE = {
  playing: false,
  current: [],
};

function playSong(state, name, file, sound) {
  let current = state.current.slice();
  let currentSong = find(current, { name });
  if (!currentSong) { // if it doesnt exist yet, add to state
    current.push({
      name,
      file,
      $sound: sound,
      playing: true,
    });
    return {
      ...state,
      current,
    }
  } else {
    return state;
  }
}

function pauseSong(state, name) {
  let current = state.current.slice();
  let currentSong = find(current, { name });
  if (currentSong) { // if song exists, change status to not playing
    currentSong.playing = false;
    return {
      ...state,
      current,
    }
  } else {
    return state;
  }
}

function resumeSong(state, name) {
  let current = state.current.slice();
  let currentSong = find(current, { name });
  if (currentSong) { // if song exists, change status to not playing
    currentSong.playing = true;
    return {
      ...state,
      current,
    }
  } else {
    return state;
  }
}


function playSongEnd(state, name) {
  let current = state.current.slice();
  let currentSong = find(current, { name });
  if (currentSong) {
    remove(current, { name })
    return {
      ...state,
      current,
    }
  } else {
    return state;
  }
}

function playError(state, name, error) {
  let current = state.current.slice();
  let currentSong = find(current, { name });
  if (currentSong) {
    currentSong = merge(currentSong, { name: null, error });
    return {
      ...state,
      current,
    }
  } else {
    return state;
  }
}


export default function setState(state = INITIAL_STATE, action) {
  if (action.type === SOUND.PLAY) {
    return playSong(state, action.name, action.file, action.sound);
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
