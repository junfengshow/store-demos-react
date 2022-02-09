const path = require('path');

const joinPath = (pathname) => {
  let url = path.join(__dirname, '..', pathname);
  return url;
}

module.exports = {
  joinPath
}
