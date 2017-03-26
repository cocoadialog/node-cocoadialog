const ThreeButtonControl = require('../Core/ThreeButtonControl');

class SecureStandardInputBox extends ThreeButtonControl {

  /**
   * {@inheritDoc}
   */
  constructor(options) {
    super('secure-standard-inputbox', options);
  }

}

module.exports = SecureStandardInputBox;
