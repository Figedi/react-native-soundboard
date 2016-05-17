import { VIEW, VIEW_LIBRARY } from '../constants';

// todo: pageviews stateindex

const INITIAL_STATE = {
  current: Object.keys(VIEW_LIBRARY)[0],
};

function selectTab(state, name) {
  return {
    current: name,
  };
}


export default function setState(state = INITIAL_STATE, action) {
  if (action.type === VIEW.SELECT) {
    return selectTab(state, action.name);
  }
  return state;
}
