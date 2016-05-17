import { SOUND, VIEW } from '../constants';

// ====================== Songs

export function beginPlaySong(name, file) {
  return {
    type: SOUND.PLAY_BEGIN,
    name,
    file,
  }
}

export function beginPlayLong(name, file) {
  return {
    type: SOUND.PLAY_BEGIN_LONG,
    name,
    file,
  }
}

export function playSong(name, file, sound) {
  return {
    type: SOUND.PLAY,
    name,
    file,
    sound,
  }
}

export function pauseSong(name) {
  return {
    type: SOUND.PAUSE,
    name,
  }
}

export function resumeSong(name) {
  return {
    type: SOUND.RESUME,
    name,
  }
}

export function playSongEnd(name) {
  return {
    type: SOUND.PLAY_END,
    name,
  }
}

export function playError(name, error) {
  return {
    type: SOUND.PLAY_ERROR,
    name,
    error,
  }
}

// ====================== Views

export function selectTab(name) {
  return {
    type: VIEW.SELECT,
    name,
  }
}

export function setView(name, index) {
  return {
    type: VIEW.SET,
    name,
    index,
  }
}
