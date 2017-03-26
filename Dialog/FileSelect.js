const Control = require('../Core/Control');
const FileSelectResult = require('./FileSelectResult');

class FileSelect extends Control {

  /**
   * Constructs the FileSelect instance.
   *
   * @param {...Object} [options]
   *   Options to initialize control with.
   */
  constructor(...options) {
    super('fileselect', ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.selectMultiple = false;
    options.withExtensions = '';
    return options;
  }

  /**
   * @inheritDoc
   */
  getResult() {
    return new FileSelectResult(this);
  }

  /**
   * Sets the allowed extensions types that can be selected.
   *
   * @param {String|Array} extensions
   *   A string or array of strings that indicate which extensions are allowed.
   *
   * @return {Control.<FileSelect>}
   */
  setExtensions(extensions) {
    return this.setOption('withExtensions', [].concat(extensions))
  }

  /**
   * Sets the multiple file select option.
   *
   * @param {Boolean} [multiple=true]
   *   Flag enabling or disabling multiple file selections.
   *
   * @return {Control.<FileSelect>}
   */
  setMultiple(multiple = true) {
    return this.setOption('selectMultiple', multiple);
  }

}

module.exports = FileSelect;
