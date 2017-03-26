const ThreeButtonControl = require('../Core/ThreeButtonControl');

class StandardInputBox extends ThreeButtonControl {

  /**
   * {@inheritDoc}
   */
  constructor(options) {
    super('standard-inputbox', options);
  }

}

module.exports = StandardInputBox;
