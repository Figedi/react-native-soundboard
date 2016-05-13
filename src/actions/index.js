import { SOUND, VIEW } from '../constants';

// ====================== Songs

export function beginPlaySong(name, file) {
  return {
    type: SOUND.PLAY_BEGIN,
    name,
    file,
  }
}

export function playSong(name, file) {
  return {
    type: SOUND.PLAY,
    name,
    file,
  }
}

export function playSongEnd(name) {
  return {
    type: SOUND.PLAY_END,
    name,
  }
}

export function playError(error) {
  return {
    type: SOUND.PLAY_ERROR,
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
