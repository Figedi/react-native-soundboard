import { VIEW, VIEW_LIBRARY } from '../constants';
import { cloneDeep } from 'lodash';
// todo: pageviews stateindex

const INITIAL_STATE = {
  views: Object.keys(VIEW_LIBRARY).reduce((acc, view) => {
    acc[view] = { index: 0 };
    return acc;
  }, {}),
  current: Object.keys(VIEW_LIBRARY)[0],
};

function selectTab(state, name) {
  return {
    current: name,
  };
}

function setView(state, name, index) {
  let views = cloneDeep(state.views);
  views[name].index = index;
  return {
    ...state,
    views,
  }
}


export default function setState(state = INITIAL_STATE, action) {
  if (action.type === VIEW.SELECT) {
    return selectTab(state, action.name);
  } else if (action.type === VIEW.SET) {
    return setView(state, action.name, action.index);
  }
  return state;
}
