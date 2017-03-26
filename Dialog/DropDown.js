const ThreeButtonControl = require('../Core/ThreeButtonControl');

class DropDown extends ThreeButtonControl {

  /**
   * {@inheritDoc}
   */
  constructor(options) {
    super('dropdown', options);
  }

}

module.exports = DropDown;
