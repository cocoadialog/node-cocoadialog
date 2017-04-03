const FileControl = require('../Core/FileControl');
const FileSaveResult = require('./FileSaveResult');

class FileSave extends FileControl {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super('filesave', ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.noCreateDirectories = false;
    return options;
  }

  /**
   * @inheritDoc
   *
   * @return {Control.<FileSave>}
   */
  createDirectories(enabled = false) {
    return super.createDirectories(enabled).setOption('noCreateDirectories', !enabled);
  }

  /**
   * @inheritDoc
   *
   * @return {FileSaveResult}
   */
  getResult() {
    return new FileSaveResult(this);
  }

}

module.exports = FileSave;
