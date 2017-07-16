import { VIEW, VIEW_LIBRARY } from '../constants';

const INITIAL_STATE = {
  views: Object.keys(VIEW_LIBRARY).reduce((acc, view) => ({ ...acc, [view]: { index: 0 } }), {}),
  current: Object.keys(VIEW_LIBRARY)[0],
};

function selectTab(state, name) {
  return {
    ...state,
    current: name,
  };
}

function setView(state, name, index) {
  return {
    ...state,
    views: {
      ...state.views,
      [name]: {
        ...state.views[name],
        index,
      },
    },
  };
}

export default function setViewState(state = INITIAL_STATE, action) {
  if (action.type === VIEW.SELECT) {
    return selectTab(state, action.name);
  } else if (action.type === VIEW.SET) {
    return setView(state, action.name, action.index);
  }
  return state;
}
