const ThreeButtonControl = require('../Core/ThreeButtonControl');
const CheckBoxResult = require('./CheckBoxResult');

class CheckBox extends ThreeButtonControl {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super('checkbox', ...options);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.checked = '';
    options.disabled = '';
    options.mixed = '';
    options.items = '';
    return options;
  }

  /**
   * @inheritDoc
   *
   * @return {CheckBoxResult}
   */
  getResult() {
    return new CheckBoxResult(this);
  }

  /**
   * Sets the label for the dialog.
   *
   * @param {String} message
   *   The message to set.
   *
   * @return {Control.<MsgBox>}
   */
  setLabel(message) {
    return this.setOption('label', message);
  }

}

module.exports = CheckBox;
