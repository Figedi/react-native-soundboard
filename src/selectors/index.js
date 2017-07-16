export const selectCurrentAsArray = state => Object.keys(state.sound.current).map(key => state.sound.current[key]);

export const selectCurrentProgress = state => state.record.current.sound.progress;
export const selectCurrentRecordState = state => state.record.current.state;
export const selectCurrentRecordPath = state => state.record.current.sound.filePath;
export const selectCurrentRecordImage = state => state.record.current.image.filePath;

export const selectCurrentRecordAssets = state => ({
  soundFileName: state.record.current.sound.fileName,
  imageFilePath: state.record.current.image.filePath,
});

export const selectCurrentView = state => state.view.current;
export const selectLibrary = state => state.library.library;
