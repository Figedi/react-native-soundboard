import Sound from 'react-native-sound';

Sound.setCategory('mixWithOthers');

class SoundPlayer {
  loadSound(file) {
    let sound;
    return new Promise((resolve, reject) => {
      sound = new Sound(file, '', (error) => {
        if (error) {
          reject(error);
        } else {
          // loaded successfully
          resolve(sound);
        }
      });
    });
  }

  doPlay(sound) {
    return new Promise((resolve, reject) => {
      sound.play((success) => {
        if (success) {
          resolve();
        } else {
          reject(new Error('Playback failed due to audio decoding errors')); // onEnd
        }
      });
    });
  }

  play(sound) {
    return this.doPlay(sound);
  }

  pause(sound) {
    if (!sound) {
      return Promise.reject();
    }
    return sound.pause();
  }

  stop(sound) {
    if (!sound) {
      return Promise.reject();
    }
    this.release(sound);
    const status = sound.stop();
    return status;
  }

  release(sound) {
    if (!sound) {
      return Promise.reject();
    }
    return sound.release();
  }
}

export default new SoundPlayer();
