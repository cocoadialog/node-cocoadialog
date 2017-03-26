const Control = require('./Control');
const ThreeButtonControlResult = require('./ThreeButtonControlResult');

class ThreeButtonControl extends Control {

  /**
   * @inheritDoc
   *
   * @return {ThreeButtonControlResult}
   */
  getResult() {
    return new ThreeButtonControlResult(this);
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.label = '';
    options.button1 = '';
    options.button2 = '';
    options.button3 = '';
    options.cancel = '';
    options.valueRequired = false;
    options.emptyText = '';
    return options;
  }

  /**
   *
   * @param {...String} buttons
   *   The button labels.
   *
   * @return {ThreeButtonControl}
   **/
  setButtons(...buttons) {
    buttons.forEach((button, i) => {
      // cocoaDialog only supports a maximum of 3 buttons.
      if (i < 3) {
        this.setOption(`button${i + 1}`, button);
      }
    });
    return this;
  }

}

module.exports = ThreeButtonControl;
