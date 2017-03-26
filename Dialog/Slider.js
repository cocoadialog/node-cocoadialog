const ThreeButtonControl = require('../Core/ThreeButtonControl');

class Slider extends ThreeButtonControl {

  /**
   * {@inheritDoc}
   */
  constructor(options) {
    super('slider', options);
  }

}

module.exports = Slider;
