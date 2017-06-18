import RNFS from 'react-native-fs';
import { isArray, reduce, isPlainObject, get } from 'lodash';

const SOUND_PATH = `${RNFS.MainBundlePath}/assets/sounds`;
const IMAGE_PATH = `${RNFS.MainBundlePath}/assets/images`;
const DEFAULT_IMAGE = 'http://placehold.it/100x100?text=';

class SoundLibrary {
  library = {};

  matchImageToSound(imageFiles, soundFile) {
    const imageObjects = imageFiles.filter(imageObject => imageObject.name === soundFile.name);
    const { name, file } = soundFile;
    const uri = get(imageObjects, '[0].file', DEFAULT_IMAGE);
    return {
      name,
      // sound-player needs an relative path to the MainBundlePath
      file: file.replace(RNFS.MainBundlePath, '.'),
      uri,
    };
  }

  matchImageToSoundfiles(imageFiles, soundFiles) {
    return reduce(
      soundFiles,
      (acc, curr, key) => {
        // an array likely contains the needed (file) information, if not we need to descend
        // deeper into the object-structure
        if (isArray(curr)) {
          return {
            ...acc,
            [key]: curr.map((element) => {
              // stopping point, we can search for an image immediately
              if (element.file) {
                return this.matchImageToSound(imageFiles[key], element);
              }

              return this.matchImageToSoundfiles(imageFiles[key], element);
            }),
          };
          // objects do not contain file information, except they have the "file" attribute
        } else if (isPlainObject(curr) && !curr.file) {
          const a = imageFiles[key];
          const b = curr;
          return { ...acc, ...this.matchImageToSoundfiles(a, b) };
        }
        // if not an array or object containing file, do nothing and immediately return accumulator
        return acc;
      },
      {},
    );
  }

  async constructTree() {
    const soundFiles = await this.findFiles(SOUND_PATH);
    const imageFiles = await this.findFiles(IMAGE_PATH);
    return this.matchImageToSoundfiles(imageFiles, soundFiles);
  }

  async findFiles(dir) {
    const results = await RNFS.readDir(dir);
    return Promise.all(
      results.map(async (curr) => {
        if (curr.isDirectory()) {
          const result = await this.findFiles(curr.path);
          return {
            [curr.name]: result,
          };
        }
        return {
          name: curr.name.split('.').slice(0, -1).join(''),
          file: curr.path,
        };
      }),
    );
  }

  async getLibrary() {
    if (Object.keys(this.library).length) {
      return this.library;
    }
    const tree = await this.constructTree();
    this.library = tree;
    return tree;
  }
}

export default new SoundLibrary();
