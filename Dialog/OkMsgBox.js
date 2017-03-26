const ThreeButtonControl = require('../Core/ThreeButtonControl');

class OkMsgBox extends ThreeButtonControl {

  /**
   * {@inheritDoc}
   */
  constructor(options) {
    super('ok-msgbox', options);
  }

}

module.exports = OkMsgBox;
