// jscodeshift -t transform.js test.js
const OLD_IMPORT_NAME = 'foo';
const NEW_IMPORT_VAR_NAME = 'bing';
const NEW_IMPORT_LIB = 'baz';
module.exports = function (fileInfo, { jscodeshift: j }, options) {
  const source = j(fileInfo.source);

  // look for the import
  const importDeclaration = source
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === OLD_IMPORT_NAME);

  if (importDeclaration.length > 0) {
    // remove the old one
    importDeclaration.remove();

    // add the new one
    const newImport = j.importDeclaration(
      [j.importDefaultSpecifier(j.identifier(NEW_IMPORT_VAR_NAME))],
      j.stringLiteral(NEW_IMPORT_LIB)
    );
    source.get().node.program.body.unshift(newImport);
  }

  return source.toSource();
};
