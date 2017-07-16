import { all, call } from 'redux-saga/effects';

import sound from './sound';
import record from './record';
import library from './library';

export default function* rootSaga() {
  yield all([call(sound), call(record), call(library)]);
}
