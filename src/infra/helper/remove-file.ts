import * as fs from "fs";

const removeFile = (dir) => {
  fs.unlink(dir, (err) => {
    if (err) {
      console.error(err);
    } else {
    }
  });
};

export default removeFile;
