// by Mouneer (https://stackoverflow.com/users/3100587/mouneer)
// https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync

const fs = require('fs');
const path = require('path');

module.exports = function mkDirByPathSync(targetDir, {isRelativeToScript = false} = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
        if (!fs.existsSync(curDir)) // added by A.R., avoid permission issues on root folders
            fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }

    }

    return curDir;
  }, initDir);
}