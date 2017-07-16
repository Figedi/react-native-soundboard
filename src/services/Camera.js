import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import shortId from 'shortid';

const DEFAULT_IMAGE = 'https://unsplash.it/200/300';

class CameraService {
  async fakeTakePicture() {
    const filePath = `${RNFS.TemporaryDirectoryPath}/${shortId.generate()}.jpeg`;

    const { promise: downloadPromise } = RNFS.downloadFile({
      fromUrl: DEFAULT_IMAGE,
      toFile: filePath,
    });
    const { statusCode } = await downloadPromise;

    console.log('downloaded image with code', statusCode);

    if (statusCode === 200) {
      return { path: filePath }; // emulate react-native-camera output
    }

    throw new Error(`Could not download file (${statusCode})`);
  }

  async takePicture(camera, opts = {}) {
    if (DeviceInfo.isEmulator()) {
      return this.fakeTakePicture();
    }

    return camera.capture(opts);
  }
}

export default new CameraService();
