export default (logObject) => {
  const reformattedObject = (({
    status, code, message, logs,
  }) => ({
    status, code, message, logs,
  }))(logObject);
  if (logObject.code.startsWith('VALIDATION_ERROR')) {
    reformattedObject.message = 'The given data was invalid.';
    reformattedObject.errors = logObject.errors.map((error) => ({ [error.field]: error.message }));
  } else if (logObject.code.startsWith('RUNTIME_ERROR') || logObject.code.startsWith('EXCEPTION')) {
    reformattedObject.message = logObject.errors[0].message;
  }
  if (logObject.debug) {
    reformattedObject.logs = logObject.debugModeLogs;
    reformattedObject.verbose = logObject.debug;
  }
  return reformattedObject;
};
