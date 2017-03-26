const Control = require('../Core/Control');

class FileSave extends Control {

  /**
   * Constructs the FileSave instance.
   *
   * @param {...Object} [options]
   *   Options to initialize control with.
   */
  constructor(...options) {
    super('filesave', ...options);
  }

  /**
   * @inheritDoc
   */
  processResult(result) {
    result = super.processResult(result);

    // Set the filename property.
    result.filename = result.lines.filter(Boolean).shift();
    delete result.lines;

    // Set aborted state based on if a filename was provided.
    this.aborted = !result.filename;

    return result;
  }

}

module.exports = FileSave;
