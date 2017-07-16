import { eventChannel, END } from 'redux-saga';
import { put, call, fork, take, all } from 'redux-saga/effects';
import shortId from 'shortid';

import { RECORD, LIBRARY } from '../constants';
import { record as actions, library as libraryActions } from '../actions';
import { SoundRecorder } from '../services';

/**
 * Creates an eventChannel for the recorder. This method binds to the emitted
 * events from the EventEmitter in SoundRecorder. An eventChannel can be
 * consumed by redux-saga.
 *
 * This needs to be done since events / callbacks are pushed-updates. However
 * redux-saga relies on the inversion of control, by pulling updates from an
 * object. This method acts as gluecode between SoundRecorder and the saga `watchPress`
 *
 *
 * @method createRecordChannel
 * @param  {SoundRecorder}            recorder The soundrecorder instance
 * @return {Function}                 Returns the function to unsubscribe from events
 */
function createRecordChannel(recorder) {
  return eventChannel((emitter) => {
    const onQuit = (payload) => {
      emitter(payload);
      emitter(END);
    };

    const onProgress = (payload) => {
      emitter(payload);
    };

    recorder.on(SoundRecorder.states.PROGRESS, onProgress);
    recorder.on(SoundRecorder.states.ERROR, onQuit);
    recorder.on(SoundRecorder.states.FINISHED, onQuit);

    // channel returns the unsubscribe fn (called on close)
    return () => {
      recorder.removeListener(SoundRecorder.states.PROGRESS, onProgress);
      recorder.removeListener(SoundRecorder.states.ERROR, onQuit);
      recorder.removeListener(SoundRecorder.states.FINISHED, onQuit);
    };
  });
}

/**
 * Inits the recorder by creating a random filepath and initializing the native
 * recorder.
 *
 * Apart from creating the recorder, it creates a redux-saga eventChannel which
 * can be consumed by regular redux-saga take's (SoundRecorder pushes events,
 * eventChannels can be pulled however)
 *
 * @method initRecorder
 * @return {Object} Returns the channel, generated filepath and recorder itself
 */
function* initRecorder() {
  const fileName = shortId.generate();
  const filePath = `${SoundRecorder.SOUND_RECORD_PATH}/${fileName}.aac`;
  const recorder = new SoundRecorder(filePath);

  yield call([recorder, recorder.initialize]);
  const channel = yield call(createRecordChannel, recorder);

  return { channel, fileName, filePath, recorder };
}

/**
 * Watches for emitted recorder Events and emits a actions to be consumed by
 * either the store and/or the watchPress saga
 *
 * @method watchRecorderEvents
 * @param  {EventChannel}            channel The Redux-saga event-channel to be consumed
 * @return {Generator}    Yields when END has been taken or channel closed

 */
function* watchRecorderEvents(channel) {
  try {
    while (true) {
      const { type, ...payload } = yield take(channel);
      if (type === SoundRecorder.states.PROGRESS) {
        yield put(actions.recordProgress(payload.currentTime, payload.progress));
      } else if (type === SoundRecorder.states.ERROR) {
        yield put(actions.recordError(payload.error));
      } else {
        yield put(actions.recordFinish());
      }
    }
  } finally {
    console.info('RecorderChannel has been closed'); // eslint-disable-line no-console
  }
}

/**
 * Watches for presses and starts recording until recorder stops itself or
 * user stops the recorder
 *
 * @method watchPress
 * @return {Generator}    Yields when parent is cancelled
 */
function* watchPress() {
  while (true) {
    yield take(RECORD.PRESS_IN);

    // init new recorder, new channel and start recording
    const { fileName, filePath, channel, recorder } = yield call(initRecorder);
    yield put(actions.recordStart(fileName, filePath));
    yield fork(watchRecorderEvents, channel);
    yield call([recorder, recorder.record]); // start recording

    // abort when either finished/errored/pressOut
    const { type } = yield take([
      RECORD.FINISHED, // internal, from watchRecorderEvents
      RECORD.ERROR, // internal, from watchRecorderEvents
      RECORD.PRESS_OUT, // external, from component
    ]);

    // finished + error already stopped the recorder, pressOut actively stops it
    if (type === RECORD.PRESS_OUT) {
      channel.close(); // close channel a.k.a stop listening
      yield recorder.stop();
      yield put(actions.recordFinish());
    }
    yield put(libraryActions.libraryRequestUpdate(true));
  }
}

function* watchRemoveAll() {
  while (true) {
    yield take(LIBRARY.REMOVE_ALL_RECORDS);
    yield call(SoundRecorder.removeAll);
  }
}

/**
 * Root-Saga, nothing to show here, just forks watchPress
 *
 * @method root
 * @return {Generator} Yields when saga-middleware is cancelled / app closed / etc
 */
export default function* root() {
  yield all([call(watchPress), call(watchRemoveAll)]);
}
