/**
 * This saga takes care of the following scenarios:
 *
 * 1. A sound plays and one taps on the same sound -> pause
 * 2. A sound plays and one taps on another sound -> cancel first one and play new tapped sound
 * 3. A sound plays and one longtaps on the same sound -> pause
 * 4. A sound plays and one longtaps somewhere else -> play the new sound simultaneously
 *   4.1 A sound plays from longpress, a user taps somewhere else -> play the new sound
 *   4.2 A sound plays from longpress, a user taps somewhere,
 *       then taps again somewhere else -> cancel the first single pressed sound,
 *       do nothing with the longpress
 * 5. A sound doesn't play and on taps on a sound -> play
 * 6. A sound doesn't play and on longtaps on a sound -> play
 * 7. A sound doesn't play and was paused before + tap on a sound -> resume
 * 8. A sound doesn't play and was paused before + longtap on a sound -> resume
 *
 */

import { put, call, select, fork, take, all } from 'redux-saga/effects';
import { find, remove } from 'lodash';

import { SOURCES, SOUND } from '../constants';
import { sound as actions } from '../actions';
import { SoundPlayer } from '../services';
import { selectCurrentAsArray } from '../selectors';

let tasks = [];

/**
 * Cleans up a task by removing it from the task-list
 *
 * @method cleanUp
 * @param  {String} name A task -name
 *
 * @return {undefined}   Doesn't return a value
 */
function cleanUp(name) {
  const newTasks = tasks.slice();
  remove(newTasks, { name });
  tasks = newTasks;
}

/**
 * Plays a song by its name and file. Stores in the redux-store the currently
 * played song (by name)
 *
 * @method doPlay
 * @param  {String}    name The name of the song
 * @param  {String}    file A path to the file of the song
 * @return {Generator}      Yields when the song has stopped or an error occured
 */
function* doPlay(name, file, meta = {}) {
  try {
    const sound = yield call(SoundPlayer.loadSound.bind(SoundPlayer), file);
    yield put(actions.playSong(name, file, sound, meta));
    yield call(SoundPlayer.play.bind(SoundPlayer), sound);
    yield put(actions.playSongEnd(name));
  } catch (e) {
    yield put(actions.playError(name, e));
  }
}

/**
 * Pauses a song by its name and sound-object.
 *
 * @method doPause
 * @param  {String}    name  The name of the song
 * @param  {Object}    sound Sound-object returned from react-native-sound
 * @return {Generator}       Yields when the song has been paused
 */
function* doPause(name, sound) {
  yield put(actions.pauseSong(name));
  return SoundPlayer.pause(sound);
}

/**
 * Resumes a song by it s name and sound-object
 *
 * @method doResume
 * @param  {String}    name  The name of the song
 * @param  {Object}    sound Sound-object returned from react-native-sound
 * @return {Generator}       Yields when the song has been resumed
 */
function* doResume(name, sound) {
  yield put(actions.resumeSong(name));
  yield call(SoundPlayer.play.bind(SoundPlayer), sound);
  yield put(actions.playSongEnd(name));
}

/**
 * Process which reacts on long-presses. See intro-text for long-press behaviour
 * @method onLongPress
 * @param  {Object}    action Passed action-object from the event
 * @return {Generator}        Yields when the song is paused/playing/error occured
 */
function* onLongPress(action) {
  const { name, file } = action;
  const current = yield select(selectCurrentAsArray);

  try {
    const currentSong = find(current, { name });
    if (currentSong) {
      const method = currentSong.playing ? doPause : doResume;
      // 3.
      yield call(method, currentSong.name, currentSong.$sound);
    } else {
      // 4.
      yield call(doPlay, name, file, { source: SOURCES.LONGPRESS });
    }
  } catch (e) {
    yield put(actions.playError(name, e));
  }
}

/**
 * Process which reacts on presses. See intro-text for press behaviour.
 *
 * @method onPress
 * @param  {Object}    action Passed action-object from the event
 * @return {Generator}        Yields when the song is paused/playing/error occured
 */
function* onPress(action) {
  const { name, file } = action;
  const current = yield select(selectCurrentAsArray);
  try {
    let foundOwn = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const song of current) {
      if (song.name === name) {
        const method = song.playing ? doPause : doResume;
        yield call(method, song.name, song.$sound);
        foundOwn = true;
      } else if (song.meta.source === SOURCES.PRESS) {
        // other song, always pause for press
        yield call(doPause, song.name, song.$sound);
      } // do nothing for SOURCES.LONGPRESS, if not the song itself (first if)
    }
    if (!foundOwn) {
      // if we havent paused/resumed, we can safely play this song
      yield call(doPlay, name, file, { source: SOURCES.PRESS });
    }
    return true;
  } catch (e) {
    return yield put(actions.playError(name, e));
  }
}

/**
 * Watcher for either presses or long-presses
 * @method watchTask
 * @param  {String}    event    Event-Type to watch for
 * @param  {Generator}    saga  A saga to fork when this event has been taken
 * @return {Generator}          Yields when parent is cancelled
 */
function* watchTask(event, saga) {
  while (true) {
    const action = yield take(event);
    const task = yield fork(saga, action);
    tasks.push({ ...action, task });
    task.done.then(() => cleanUp(action.name)).catch(() => cleanUp(action.name));
  }
}

/**
 * Watches for presses and forks the onPress process
 *
 * @method watchPress
 * @return {Generator}    Yields when parent is cancelled
 */
function* watchPress() {
  yield call(watchTask, SOUND.PLAY_BEGIN, onPress);
}

/**
 * Watches for long-presses and forks the onLongPress process
 *
 * @method watchLongPress
 * @return {Generator}    Yields when parent is cancelled
 */
function* watchLongPress() {
  yield call(watchTask, SOUND.PLAY_BEGIN_LONG, onLongPress);
}

/**
 * Root-Saga, nothing to show here, just calls watchPress and watchLongPress
 *
 * @method root
 * @return {Generator} Yields when saga-middleware is cancelled / app closed / etc
 */
export default function* root() {
  yield all([fork(watchPress), fork(watchLongPress)]);
}
