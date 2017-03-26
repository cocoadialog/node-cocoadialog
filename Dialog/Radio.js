const ThreeButtonControl = require('../Core/ThreeButtonControl');

class Radio extends ThreeButtonControl {

  /**
   * {@inheritDoc}
   */
  constructor(options) {
    options._ = [];
    ['checked', 'mixed', 'selected'].forEach(prop => {
      if (options[prop]) {
        options._ = options._.concat(`--${prop}`, options[prop]);
        delete options[prop];
      }
    });
    super('radio', options);
  }

}

module.exports = Radio;
