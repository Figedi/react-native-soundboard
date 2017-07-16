import { take, call, all, put, fork, select } from 'redux-saga/effects';
import { last } from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';

import { LIBRARY } from '../constants';
import { SoundLibrary, SoundRecorder } from '../services';
import { library as actions, record as recordActions } from '../actions';
import { selectCurrentRecordAssets } from '../selectors';

function* updateLibrary(forceUpdate = false) {
  const library = yield call([SoundLibrary, SoundLibrary.getLibrary], forceUpdate);
  yield put(actions.libraryUpdate(library));
}

// moves a file from sourcePath to the records-image path with a custom fileName
function* moveImage() {
  const { soundFileName, imageFilePath } = yield select(selectCurrentRecordAssets);
  const file = last(imageFilePath.split('/'));
  const [, extension] = file.split('.');
  const destPath = `${SoundRecorder.IMAGE_RECORD_PATH}/${soundFileName}.${extension}`;

  yield call(SoundLibrary.moveFile, imageFilePath, destPath);
  yield call(updateLibrary, true);
  yield put(recordActions.recordImage(destPath));
}

function* watchRehydrate() {
  yield take(REHYDRATE);
  yield call(updateLibrary);
}

function* watchUpdate() {
  while (true) {
    const { forceUpdate } = yield take(LIBRARY.REQUEST_UPDATE);
    yield call(updateLibrary, forceUpdate);
  }
}

function* watchMoveImage() {
  while (true) {
    yield take(LIBRARY.MOVE_IMAGE);
    yield fork(moveImage);
  }
}

function* watchRemove() {
  while (true) {
    const { path } = yield take(LIBRARY.REMOVE_RECORD);
    yield yield call([SoundLibrary, SoundLibrary.removeRecord], path);
    yield call(updateLibrary, true);
  }
}

export default function* root() {
  yield all([call(watchUpdate), call(watchRehydrate), call(watchMoveImage), call(watchRemove)]);
}
