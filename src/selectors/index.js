/* eslint-disable import/prefer-default-export */
export const selectCurrentAsArray = state =>
  Object.keys(state.sound.current).map(key => state.sound.current[key]);
