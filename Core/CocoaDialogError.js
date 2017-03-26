class CocoaDialogError extends Error {

  constructor(message, id) {
    if (typeof message === 'string') {
      message = message.replace('cocoaDialog Error: ', '');
    }
    super(message, id);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
    else {
      this.stack = (new Error(message)).stack;
    }
  }

}

module.exports = CocoaDialogError;
