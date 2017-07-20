import RNFS from 'react-native-fs';
import { zip, isArray, reduce, isPlainObject, get, values } from 'lodash';
import { PATHS } from '../constants';

class SoundLibrary {
  library = {};

  matchImageToSound(imageFiles, soundFile) {
    const { name, file } = soundFile;
    const imageObjects = imageFiles.filter(imageObject => imageObject.name === name);
    const uri = get(imageObjects, '[0].file');
    return {
      name,
      file,
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
    const results = await Promise.all(
      values(PATHS).map(async (path) => {
        await this.ensureDirectory(path);
        const soundFiles = await this.findFiles(`${path}/sounds`);
        const imageFiles = await this.findFiles(`${path}/images`);

        return this.matchImageToSoundfiles(imageFiles, soundFiles);
      }),
    );
    return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }

  async ensureDirectory(directory) {
    const folders = [`${directory}/sounds`, `${directory}/images`];

    const folderStatus = await Promise.all(folders.map(folder => RNFS.exists(folder)));
    return Promise.all(
      zip(folders, folderStatus).filter(([, exists]) => !exists).map(([folder]) => RNFS.mkdir(folder)),
    );
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

  async moveFile(from, to) {
    const fileExists = await RNFS.exists(to);
    if (fileExists) {
      await RNFS.unlink(to);
    }
    await RNFS.moveFile(from, to);
  }

  async getLibrary(forceUpdate = false) {
    if (Object.keys(this.library).length && !forceUpdate) {
      return this.library;
    }
    const tree = await this.constructTree();
    this.library = tree;
    return this.library;
  }

  async removeRecord(path) {
    if (!path || !path.length) {
      return Promise.resolve();
    }
    return RNFS.unlink(path);
  }

  async removeRecords(records) {
    if (!records || !records.length) {
      return Promise.resolve();
    }
    return Promise.all(records.map(this.removeRecord));
  }
}

export default new SoundLibrary();
