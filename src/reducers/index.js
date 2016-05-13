import { combineReducers } from 'redux';

import sound from './sound';
import view from './view';

export default combineReducers({
  sound,
  view,
});
