import { RECORD } from '../constants';

export function recordStart(fileName, filePath) {
  return {
    type: RECORD.START,
    fileName,
    filePath,
  };
}

export function recordProgress(currentTime, progress) {
  return {
    type: RECORD.PROGRESS,
    currentTime,
    progress,
  };
}

export function recordFinish() {
  return {
    type: RECORD.FINISHED,
  };
}

export function recordError(error) {
  return {
    type: RECORD.ERROR,
    error,
  };
}

export function recordPressIn() {
  return {
    type: RECORD.PRESS_IN,
  };
}

export function recordPressOut() {
  return {
    type: RECORD.PRESS_OUT,
  };
}

export function recordImage(imageFilePath) {
  return {
    type: RECORD.IMAGE,
    imageFilePath,
  };
}

export function recordReset() {
  return {
    type: RECORD.RESET,
  };
}
