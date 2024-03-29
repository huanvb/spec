const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const requireFromString = require('require-from-string');

export const isSpecifiedBy = async campaign => {
  const specModule = await readFileAsync(`./rules/${campaign}.js`, 'utf8');
  return requireFromString(specModule).isSatisfied;
};
