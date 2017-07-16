import { Platform } from 'react-native';
import EventEmitter from 'eventemitter3';
import { AudioRecorder } from 'react-native-audio';
import RNFS from 'react-native-fs';

import { PATHS } from '../constants';

const MAX_TIME = 30; // 60 seconds

export default class SoundRecorder extends EventEmitter {
  /**
   * Removes all used directories AND sounds, then recreates the folders. Use with caution.
   *
   * @method removeAll
   * @return {Promise} Returns when all folers have been removed & recreated
   */
  static async removeAll() {
    const soundsExist = await RNFS.exists(SoundRecorder.SOUND_RECORD_PATH);
    const imagesExist = await RNFS.exists(SoundRecorder.IMAGE_RECORD_PATH);
    if (!soundsExist || !imagesExist) {
      return SoundRecorder.ensureDirectory();
    }
    await Promise.all([
      RNFS.unlink(SoundRecorder.SOUND_RECORD_PATH),
      RNFS.unlink(SoundRecorder.IMAGE_RECORD_PATH),
    ]);
    return SoundRecorder.ensureDirectory();
  }

  /**
   * Ensures the record-directory is available at runtime
   *
   * @method ensureDirectory
   * @return {Promise}       Returns when all directories have been created (if necessary)
   */
  static async ensureDirectory() {
    // doesnt throw when already exists
    await Promise.all([
      RNFS.mkdir(SoundRecorder.SOUND_RECORD_PATH),
      RNFS.mkdir(SoundRecorder.IMAGE_RECORD_PATH),
    ]);
  }

  static SOUND_RECORD_PATH = `${PATHS.records}/sounds/records`;
  static IMAGE_RECORD_PATH = `${PATHS.records}/images/records`;

  static states = {
    PROGRESS: 'PROGRESS',
    FINISHED: 'FINISHED',
    ERROR: 'ERROR',
  };

  state = {
    audioPath: undefined,
    currentTime: 0.0,
    hasPermission: false,
    recording: false,
    finished: false,
    stoppedRecording: true,
  };

  setState(object) {
    this.state = {
      ...this.state,
      ...object,
    };
  }

  constructor(audioPath) {
    super();
    this.setState({ audioPath });
  }

  async initialize() {
    const hasPermission = await this.checkPermission();
    await SoundRecorder.ensureDirectory();

    this.setState({ hasPermission });

    if (!hasPermission) {
      return;
    }

    AudioRecorder.onProgress = (data) => {
      this.setState({ currentTime: data.currentTime });

      this.emit(SoundRecorder.states.PROGRESS, {
        type: SoundRecorder.states.PROGRESS,
        currentTime: data.currentTime,
        // eslint-disable-next-line
        progress: parseInt(data.currentTime / MAX_TIME * 100, 10),
      });
      if (data.currentTime >= MAX_TIME) {
        this.stop();
      }
    };

    AudioRecorder.onFinished = (data) => {
      // Android callback comes in the form of a promise instead.
      if (Platform.OS === 'ios') {
        this.finishRecording(data.status === 'OK', data.audioFileURL);
      }
    };
  }

  finishRecording(didSucceed, filePath) {
    this.setState({ finished: didSucceed });
    this.emit(SoundRecorder.states.FINISHED, {
      type: SoundRecorder.states.FINISHED,
      didSucceed,
      filePath,
    });
  }

  prepareRecordingPath(audioPath, config) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
      ...config,
    });
  }

  checkPermission() {
    if (Platform.OS === 'ios') {
      return Promise.resolve(true);
    }
    // do not support any other than ios
    return Promise.reject(new Error('Android not supported'));
  }

  async record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn("Can't record, no permission granted!");
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({ recording: true });

    try {
      await AudioRecorder.startRecording();
    } catch (error) {
      this.emit(SoundRecorder.states.ERROR, {
        type: SoundRecorder.states.ERROR,
        error,
      });
    }
  }

  async stop() {
    if (!this.state.recording) {
      console.warn("Can't stop, not recording!");
      return;
    }

    this.setState({ stoppedRecording: true, recording: false });

    try {
      await AudioRecorder.stopRecording();
    } catch (error) {
      this.emit(SoundRecorder.states.ERROR, {
        type: SoundRecorder.states.ERROR,
        error,
      });
    }
  }
}
