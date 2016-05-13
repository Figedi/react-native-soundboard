import Sound from 'react-native-sound'

class SoundPlayer {

  constructor() {
    this.current = null;
  }

  loadSound(file) {
    if (this.current) {
      this.stop();
    }
    let sound;
    return new Promise((resolve, reject) => {
      sound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          reject(error);
        } else { // loaded successfully
          this.current = sound;
          resolve(sound);
        }
      });
    });
  }

  _doPlay(sound) {
    return new Promise((resolve, reject) => {
      this.paused = false;
      sound.play((success) => {
        if (success) resolve(); // onEnd
        else reject(new Error('Playback failed due to audio decoding errors'));
      });
    })
  }

  play(file) {
    if (this.paused) {
      return this._doPlay(this.current);
    } else {
      return this.loadSound(file).then(this._doPlay.bind(this));
    }
  }

  pause(sound = this.current) {
    if (!sound) {
      return;
    }
    this.paused = true;
    return sound.pause();
  }

  toggle(file) {
    if (!this.current) {
      return this.play(file);
    } else if (this.current._filename.indexOf(file) < 0) {
      this.stop();
      return this.play(file);
    }
    return this.paused ? this.play() : this.pause();
  }

  stop(sound = this.current) {
    if (!sound) {
      return;
    }
    this.release(sound);
    let status = sound.stop();
    this.paused = false;
    this.current = null;
    return status;
  }

  release(sound = this.current) {
    if (!sound) {
      return;
    }
    return sound.release();
  }
}

export default new SoundPlayer();
