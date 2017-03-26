const Control = require('../Core/Control');

class Notify extends Control {

  /**
   * Constructs the Notify instance.
   *
   * @param {...Object} [options]
   *   Options to initialize control with.
   */
  constructor(...options) {
    super('notify', ...options);
  }

}

module.exports = Notify;
