import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { SOUND } from '../constants';
import * as actions from '../actions';
import { SoundPlayer } from '../services';

function* playSong(action) {
  const { name, file } = action;
  yield put(actions.playSong(name, file));
  try {
    // we defer state behaviour to the soundplayer, once called in playing mode, it switches to pause, and resolves -> this saga resolves to pause in the next step
    yield call(SoundPlayer.toggle.bind(SoundPlayer), file);
    yield put(actions.playSongEnd(name));
  } catch (e) {
    yield put(actions.playError(e));
  }
}


export default function* root() {
  yield takeLatest(SOUND.PLAY_BEGIN, playSong);
}
