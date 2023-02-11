const fs = require('fs/promises');
const path = require('path');

const talkerFilePath = path.resolve(__dirname, 'talker.json');

const talkerReadFile = async () => {
  const talkerReadFileJSON = await fs.readFile(talkerFilePath, 'utf8');
  return JSON.parse(talkerReadFileJSON);
};

module.exports = {
  talkerReadFile,
  talkerFilePath,
};