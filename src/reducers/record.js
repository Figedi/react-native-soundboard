import { RECORD, RECORD_STATES } from '../constants';

const INITIAL_STATE = {
  current: {
    state: RECORD_STATES.FINISHED,
    error: null,
    sound: {
      currentTime: 0.0,
      progress: 0,
      fileName: '',
      filePath: '',
    },
    image: {
      filePath: '',
    },
  },
};

export default function setRecordState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECORD.START: {
      return {
        ...state,
        current: {
          ...state.current,
          state: RECORD_STATES.START,
          sound: {
            ...state.current.sound,
            fileName: action.fileName,
            filePath: action.filePath,
          },
        },
      };
    }
    case RECORD.PROGRESS: {
      return {
        ...state,
        current: {
          ...state.current,
          state: RECORD_STATES.PROGRESS,
          sound: {
            ...state.current.sound,
            currentTime: action.currentTime,
            progress: action.progress,
          },
        },
      };
    }
    case RECORD.FINISHED: {
      return {
        ...state,
        current: { ...state.current, state: RECORD_STATES.FINISHED },
      };
    }
    case RECORD.ERROR: {
      return {
        ...state,
        current: {
          ...state.current,
          state: RECORD_STATES.ERROR,
          error: action.error,
          sound: INITIAL_STATE.current.sound,
          image: INITIAL_STATE.current.image,
        },
      };
    }
    case RECORD.IMAGE: {
      return {
        ...state,
        current: {
          ...state.current,
          image: {
            ...state.current.image,
            filePath: action.imageFilePath,
          },
        },
      };
    }
    case RECORD.RESET: {
      return {
        ...state,
        current: INITIAL_STATE.current,
      };
    }
    default: {
      return state;
    }
  }
}
