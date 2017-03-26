const ThreeButtonControl = require('../Core/ThreeButtonControl');

class YesNoMsgBox extends ThreeButtonControl {

  /**
   * {@inheritDoc}
   */
  constructor(options) {
    super('yesno-msgbox', options);
  }

}

module.exports = YesNoMsgBox;
