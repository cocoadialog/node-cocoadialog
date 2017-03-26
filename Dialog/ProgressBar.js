const Control = require('../Core/Control');
const Promise = require('any-promise');
const CocoaDialogAbort = require('../Core/CocoaDialogAbort');
const ProgressBarResult = require('./ProgressBarResult');

const emitter = require('../Core/EventEmitter');

class ProgressBar extends Control {

  /**
   * Constructs the Progress instance.
   *
   * @param {...Object} [options]
   *   Options to initialize control with.
   */
  constructor(...options) {
    super('progressbar', ...options);

    /**
     * The items to be processed.
     *
     * @type {Array}
     */
    this.items = [];

    /**
     * @type {ProgressBar~itemIterator}
     */
    this.itemIterator = Control.noop;

    /**
     * The current percentage.
     *
     * @type {Number}
     */
    this.percent = this.options.percent || 0;

    /**
     * The current text being displayed.
     *
     * @type {String}
     */
    this.text = this.options.text || '';
  }

  /**
   * @inheritDoc
   */
  availableOptions() {
    let options = super.availableOptions();
    options.indeterminate = false;
    options.percent = -1;
    options.stoppable = false;
    options.text = '';
    return options;
  }

  /**
   * @inheritDoc
   */
  getResult() {
    return new ProgressBarResult(this);
  }

  /**
   * @inheritDoc
   */
  openSync() {
    // Intercept the "Stop" button.
    if (this.options.stoppable) {
      this.on('stdout', result => {
        if (result.currentLine.match(/^stopped/)) {
          result.abort();
          this.aborted = true;
        }
      });
    }
    return super.openSync();
  }

  open() {
    return new Promise((resolve, reject) => {
      this.on('result', resolve).on('error', reject).openSync();
      let total = this.items.length;
      return this.mapSeries(this.items, (item, i) => {
        if (this.aborted) {
          return Promise.reject(new CocoaDialogAbort('Stopped!'));
        }
        this.setText(`Processing (${i}/${total})...`);
        return Promise.resolve().then(() => {
          if (this.aborted) {
            return Promise.reject(new CocoaDialogAbort('Stopped!'));
          }
          return this.itemIterator(item, i, total, this);
        }).then(() => {
          this.setText(this.text + ' done!').setPercent(i + 1, total);
          return item;
        });
      }).then(items => {
        this.setPercent(100).close();
        return items;
      });
    });
  }

  /**
   *
   * @param items
   * @param {ProgressBar~itemIterator} iterator
   *
   * @return {ProgressBar}
   */
  processItems(items, iterator) {
    this.items = Array.from(items);
    this.itemIterator = iterator;
    return this;
  }

  /**
   * @return {ProgressBar}
   */
  setText(text) {
    if (this.text !== text) {
      this.text = text;
      return this.update();
    }
    return this;
  }

  /**
   * Sets the current percentage.
   *
   * @param {Number} percent
   *   The percent to set or the "current" value if, total is provided.
   * @param {Number} [total]
   *   The total used to determine percentage.
   *
   * @return {ProgressBar}
   */
  setPercent(percent, total) {
    if (total) {
      percent = 100 / total * percent;
    }
    percent = Math.round(percent);
    if (this.percent !== percent) {
      this.percent = percent;
      return this.update();
    }
    return this;
  }

  /**
   * Indicates whether progress can be stopped.
   *
   * @param {Boolean} [stoppable=true]
   *
   * @return {Control}
   */
  setStoppable(stoppable = true) {
    return this.setOption('stoppable', stoppable);
  }

  /**
   * @return {ProgressBar}
   */
  update() {
    emitter.emit('beforeUpdate', this);
    this.write(this.percent + ' ' + this.text);
    emitter.emit('update', this);
    return this;
  }

  /**
   * @return {ProgressBar}
   */
  write(string) {
    if (!this.aborted && this.childProcess) {
      this.childProcess.stdin.write(`${string}\n`);
    }
    return this;
  }

}

module.exports = ProgressBar;

/**
 * @callback ProgressBar~itemIterator
 *
 * @param {*} item
 *   The item being processed.
 * @param {Number} i
 *   The current index of the array item being processed.
 * @param {Number} total
 *   The total number of items.
 * @param {ProgressBar} progressBar
 *   The current ProgressBar instance.
 */
