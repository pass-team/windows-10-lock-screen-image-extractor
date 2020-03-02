export default (logObject) => {
  let reformattedObj = {};
  if (logObject.status === 'success') {
    reformattedObj = {
      status: logObject.status,
      message: logObject.message,
      logs: logObject.logs,
    };
    if (logObject.debug) {
      reformattedObj.logs = logObject.debugModeLogs;
      reformattedObj.verbose = logObject.debug;
    }
  } else if (logObject.code.startsWith('VALIDATION_ERROR')) {
    reformattedObj = {
      status: logObject.status,
      code: logObject.code,
      message: 'The given data was invalid.',
      errors: logObject.errors.map((error) => {
        const obj = {};
        obj[error.field] = error.message;
        return obj;
      }),
      logs: logObject.logs,
    };
    if (logObject.debug) {
      reformattedObj.logs = logObject.debugModeLogs;
      reformattedObj.verbose = logObject.debug;
    }
  } else if (logObject.code.startsWith('RUNTIME_ERROR')) {
    reformattedObj = {
      status: logObject.status,
      code: logObject.code,
      message: logObject.errors[0].message,
      logs: logObject.logs,
    };
    if (logObject.debug) {
      reformattedObj.logs = logObject.debugModeLogs;
      reformattedObj.verbose = logObject.debug;
    }
  } else if (logObject.code.startsWith('EXCEPTION')) {
    reformattedObj = {
      status: logObject.status,
      code: logObject.code,
      message: logObject.errors[0].message,
      logs: logObject.logs,
    };
    if (logObject.debug) {
      reformattedObj.logs = logObject.debugModeLogs;
      reformattedObj.verbose = logObject.debug;
    }
  }
  return reformattedObj;
};
