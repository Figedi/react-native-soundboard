import { put, call, select, fork, take } from 'redux-saga/effects';
import { filter, find, remove } from 'lodash';

import { SOUND } from '../constants';
import * as actions from '../actions';
import { SoundPlayer } from '../services';

const currentSounds = (state) => state.sound.current;

function* cancelAll(songs) {
  return yield songs.map(function* mapFunc({ $sound, name }) {
    cleanUp(name);
    yield put(actions.playSongEnd(name));
    return SoundPlayer.stop($sound);
  });
}

let tasks = [];
/**
 * multiple songs:
 * 1. sound spielt gerade und man klickt auf den gleichen -> pause
 * 2. sound spielt gerade und man klickt woanders -> alle anderen cancel + neuen abspielen
 * 3. sound spielt gerade und man klickt *long* woanders -> neuen abspielen zusätzlich
 * 4. sound spielt gerade und man klickt *long* auf dengleicen -> pause
 * 5. sound spielt nicht gerade und man klickt normal -> abspielen
 * 6. sound spielt nicht gerade und man klickt *long* -> normales abspielen (5.)
 * 7. sound spielt nicht gerade und man klickt normal (vorher pause) -> resume
 * 8. sound spielt nicht gerade und man klickt *long* normal (vorher pause) -> resume
 *
 */

function* doPlay(name, file) {
  try {
    let sound = yield call(SoundPlayer.loadSound.bind(SoundPlayer), file);
    yield put(actions.playSong(name, file, sound));
    yield call(SoundPlayer.play.bind(SoundPlayer), sound);
    return yield put(actions.playSongEnd(name));
  } catch (e) {
    yield put(actions.playError(name, e));
  }
}

function* doPause(name, sound) {
  yield put(actions.pauseSong(name));
  return SoundPlayer.pause(sound);
}

function* doResume(name, sound) {
  yield put(actions.resumeSong(name));
  yield call(SoundPlayer.play.bind(SoundPlayer), sound);
  yield put(actions.playSongEnd(name));
}

function* onLongPress(action) {
  const { name, file } = action;
  const current = yield select(currentSounds);
  try {
    let currentSong = find(current, { name });
    if (currentSong) { // 4.
      yield* doPause(currentSong.name, currentSong.$sound);
    } else { // 3.
      yield* doPlay(name, file);
    }
  } catch (e) {
    yield put(actions.playError(name, e));
  }
}

function* onPress(action) {
  const { name, file } = action;
  const current = yield select(currentSounds);
  const currentPlaying = filter(current, { playing: true });
  try {
    if (currentPlaying.length) {
      let currentSong = find(currentPlaying, { name });
      if (currentSong) { // 1.
        yield* doPause(currentSong.name, currentSong.$sound);
      } else { // 2.
        yield cancelAll(currentPlaying);
        yield* doPlay(name, file)
      }
    } else {
      let currentSong = find(current, { name });
      if (currentSong) { // was paused -> resume
        yield* doResume(currentSong.name, currentSong.$sound);
      } else { // 5.
        yield* doPlay(name, file);
      }
    }
  } catch (e) {
    yield put(actions.playError(name, e));
  }
}

function cleanUp(name) {
  let newTasks = tasks.slice();
  remove(newTasks, { name });
  tasks = newTasks;
}

function *watchTask(event, saga) {
  while (true) {
    const action = yield take(event)
    let task = yield fork(saga, action);
    tasks.push({ ...action, task });
    task.done.then(() => cleanUp(action.name)).catch(() => cleanUp(action.name));
  }
}

function *watchPress() {
  yield watchTask(SOUND.PLAY_BEGIN, onPress)
}

function *watchLongPress() {
  yield watchTask(SOUND.PLAY_BEGIN_LONG, onLongPress)
}

export default function* root() {
  yield [
    fork(watchPress),
    fork(watchLongPress),
  ];
}
