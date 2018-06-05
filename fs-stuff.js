
const fs = require('fs');
const path = require('path');

 class FSStuff {

  // by Mouneer (https://stackoverflow.com/users/3100587/mouneer)
  // https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
  mkDirByPathSync(targetDir, {isRelativeToScript = false} = {}) {
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

  // by Thybzi (https://stackoverflow.com/users/3027390/thybzi)
  // https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty  
  rimraf(targetDir) {
    if (fs.existsSync(targetDir)) {
        fs.readdirSync(targetDir).forEach(function(entry) {
            var entry_path = path.join(targetDir, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                _this.rimraf(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });
        fs.rmdirSync(targetDir);
    }
  }
}

_this = new FSStuff();

module.exports = _this;