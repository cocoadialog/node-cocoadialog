const ThreeButtonControl = require('../Core/ThreeButtonControl');

class SecureInputBox extends ThreeButtonControl {

  /**
   * {@inheritDoc}
   */
  constructor(options) {
    super('secure-inputbox', options);
  }

}

module.exports = SecureInputBox;
