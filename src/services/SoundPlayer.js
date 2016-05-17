import Sound from 'react-native-sound'

class SoundPlayer {

  constructor() {
  }

  loadSound(file) {
    let sound;
    return new Promise((resolve, reject) => {
      sound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          reject(error);
        } else { // loaded successfully
          resolve(sound);
        }
      });
    });
  }

  _doPlay(sound) {
    return new Promise((resolve, reject) => {
      sound.play((success) => {
        if (success) resolve(); // onEnd
        else reject(new Error('Playback failed due to audio decoding errors'));
      });
    })
  }

  play(sound) {
    return this._doPlay(sound);
  }

  pause(sound) {
    if (!sound) {
      return;
    }
    return sound.pause();
  }

  stop(sound) {
    if (!sound) {
      return;
    }
    this.release(sound);
    let status = sound.stop();
    return status;
  }

  release(sound) {
    if (!sound) {
      return;
    }
    return sound.release();
  }
}

export default new SoundPlayer();
