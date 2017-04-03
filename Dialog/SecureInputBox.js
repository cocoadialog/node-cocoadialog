const InputBox = require('./InputBox');

class SecureInputBox extends InputBox {

  /**
   * @inheritDoc
   */
  constructor(...options) {
    super(...options);
    this.name = 'secure-inputbox';
  }

}

module.exports = SecureInputBox;
