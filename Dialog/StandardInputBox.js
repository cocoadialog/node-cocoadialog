const InputBox = require('./InputBox');

class StandardInputBox extends InputBox {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super(...options);
    this.name = 'standard-inputbox';
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.noCancel = false;
    return options;
  }

  /**
   * Sets whether control will show the "Cancel" button.
   *
   * @param {Boolean} [enabled=true]
   *   Flag determining whether this option is enabled.
   *
   * @return {Control.<OkMsgBox>}
   */
  noCancel(enabled = true) {
    return this.setOption('noCancel', enabled);
  }

}

module.exports = StandardInputBox;
