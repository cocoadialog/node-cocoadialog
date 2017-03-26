const ThreeButtonControl = require('../Core/ThreeButtonControl');

class TextBox extends ThreeButtonControl {

  /**
   * {@inheritDoc}
   */
  constructor(options) {
    super('textbox', options);
  }

}

module.exports = TextBox;
