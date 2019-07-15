module.exports.isSatisfied = (...args) =>
  args.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
