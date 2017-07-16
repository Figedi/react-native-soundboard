import { LIBRARY } from '../constants';

const INITIAL_STATE = {
  library: {},
};

export default function setLibraryState(state = INITIAL_STATE, action) {
  // either rehydrate or called from somewhere else...
  if (action.type === LIBRARY.UPDATE) {
    return { library: action.library };
  } else if (action.type === LIBRARY.REMOVE_ALL_RECORDS) {
    return { library: { ...state.library, records: [] } };
  }
  return state;
}
