import { LIBRARY } from '../constants';

export function libraryRequestUpdate(forceUpdate) {
  return {
    type: LIBRARY.REQUEST_UPDATE,
    forceUpdate,
  };
}

export function libraryUpdate(library) {
  return {
    type: LIBRARY.UPDATE,
    library,
  };
}

export function libraryRemoveAllRecords() {
  return {
    type: LIBRARY.REMOVE_ALL_RECORDS,
  };
}

export function libraryRemoveRecord(path) {
  return {
    type: LIBRARY.REMOVE_RECORD,
    path,
  };
}

export function libraryRemoveRecords(records) {
  return {
    type: LIBRARY.REMOVE_RECORDS,
    records,
  };
}

export function libraryMoveImage() {
  return {
    type: LIBRARY.MOVE_IMAGE,
  };
}
