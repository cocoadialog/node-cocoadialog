const ThreeButtonControl = require('../Core/ThreeButtonControl');

class InputBox extends ThreeButtonControl {

  /**
   * {@inheritDoc}
   */
  constructor(options) {
    super('inputbox', options);
  }

}

module.exports = InputBox;
