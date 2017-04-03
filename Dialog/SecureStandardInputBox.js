const StandardInputBox = require('./StandardInputBox');

class SecureStandardInputBox extends StandardInputBox {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super(...options);
    this.name = 'secure-standard-inputbox';
  }

}

module.exports = SecureStandardInputBox;
