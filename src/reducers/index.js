import { combineReducers } from 'redux';

import sound from './sound';
import view from './view';
import record from './record';
import library from './library';

export default combineReducers({
  sound,
  view,
  record,
  library,
});
