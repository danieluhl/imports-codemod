const { run: jscodeshift } = require('jscodeshift/src/Runner');

const transformPath = 'transform.js';
const paths = ['test.js'];
const options = {
  dry: true,
  print: true,
  verbose: 1,
  // ...
};

const res = await jscodeshift(transformPath, paths, options);
console.log(res);
