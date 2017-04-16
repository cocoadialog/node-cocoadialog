// Mocha.
const assert = require('assert');

/**
 * Asserts that the control's options construct a proper argument array.
 *
 * @param {Control} instance
 *   The control instance.
 * @param {String} expected
 *   The expected output.
 */
assert.controlArgs = function (instance, expected) {
  this.equal(instance.getArguments().join(' '), expected.length ? instance.name + ' ' + expected : instance.name);
};

const test = {

  /**
   * Tests that a class inherits from the proper parents.
   *
   * @param {Object} instance
   *   The class instance to test.
   * @param {Object|Object[]} ParentClasses
   *   The parent class or array of parent classes to test instance against.
   * @param {Function} [callback]
   *   A callback to perform.
   */
  instanceOf: function (instance, ParentClasses = null, callback = null) {
    describe(instance.constructor.name, function () {
      if (ParentClasses) {
        let ctors = [].concat(ParentClasses);
        for (let i = 0, l = ctors.length; i < l; i++) {
          it(`should be an instanceof ${ctors[i].name}`, function () {
            assert.strictEqual(instance instanceof ctors[i], true);
          });
        }
      }
      if (typeof callback === 'function') {
        callback.call(this, instance);
      }
    });
  },

  /**
   * Tests a control.
   *
   * @param {Function} ControlClass
   *   A Control based class to test.
   * @param {Function|Function[]} ParentClasses
   *   The parent class or array of parent classes to test instance against.
   * @param {Function|Function[]} ResultObject
   *   The parent class or array of parent classes to test the Control's
   *   result object against.
   *
   * @param {Function} [callback]
   *   A callback to perform.
   */
  control: function (ControlClass, ParentClasses = null, ResultObject = null, callback = null) {
    let test = this;
    let instance = new ControlClass();
    this.instanceOf(instance, ParentClasses, function () {
      if (typeof callback === 'function') {
        /**
         * Tests setting options via a control's helper methods.
         *
         * @param {String} method
         *   The method name to test.
         * @param {Array} args
         *   An array of arguments to pass to the method.
         * @param {String} expected
         *   The expected CLI argument string that should be constructed.
         */
        instance.testMethod = function (method, args, expected) {
          it(`should send "${expected}" when using .${method}(${JSON.stringify(args).slice(1, -1)})`, function () {
            instance.options = {};
            instance[method].apply(instance, args);
            assert.controlArgs(instance, expected);
            instance.options = {};
          });
        };
        callback.call(this, instance);
      }
      if (ResultObject) {
        test.controlResultObject(instance, ResultObject);
      }
    });
  },

  /**
   * Tests a control's result object instances.
   *
   * @param {Control} instance
   *   A control instance.
   * @param {Function|Function[]} ResultObject
   *   The parent class or array of parent classes to test the Control's
   *   result object against.
   */
  controlResultObject: function (instance, ResultObject) {
    let result = instance.getResult();
    let ctors = [].concat(ResultObject);
    it(`should return the result object ${ctors[ctors.length - 1].name}`, function () {
      assert.strictEqual(result.constructor.name === ctors[ctors.length - 1].name, true);
    });
    for (let i = 0, l = ctors.length; i < l; i++) {
      it(`should return a result object that is an instanceof ${ctors[i].name}`, function () {
        assert.strictEqual(result instanceof ctors[i], true);
      });
    }
  }

};

// Core.
const CocoaDialogError = require('../Core/CocoaDialogError');
const CocoaDialogAbort = require('../Core/CocoaDialogAbort');
const CocoaDialogTimeout = require('../Core/CocoaDialogTimeout');
const Control = require('../Core/Control');
const ControlResult = require('../Core/ControlResult');
const FileControl = require('../Core/FileControl');
const ThreeButtonControl = require('../Core/ThreeButtonControl');
const ThreeButtonControlResult = require('../Core/ThreeButtonControlResult');

// Dialog.
const CheckBox = require('../Dialog/CheckBox');
const CheckBoxResult = require('../Dialog/CheckBoxResult');
const DropDown = require('../Dialog/DropDown');
const FileSave = require('../Dialog/FileSave');
const FileSaveResult = require('../Dialog/FileSaveResult');
const FileSelect = require('../Dialog/FileSelect');
const FileSelectResult = require('../Dialog/FileSelectResult');
const InputBox = require('../Dialog/InputBox');
const InputResult = require('../Dialog/InputResult');
const MsgBox = require('../Dialog/MsgBox');
const Notify = require('../Dialog/Notify');
const OkMsgBox = require('../Dialog/OkMsgBox');
const ProgressBar = require('../Dialog/ProgressBar');
const ProgressBarResult = require('../Dialog/ProgressBarResult');
const Radio = require('../Dialog/Radio');
const RadioResult = require('../Dialog/RadioResult');
const SecureInputBox = require('../Dialog/SecureInputBox');
const SecureStandardInputBox = require('../Dialog/SecureStandardInputBox');
const Slider = require('../Dialog/Slider');
const StandardDropDown = require('../Dialog/StandardDropDown');
const StandardInputBox = require('../Dialog/StandardInputBox');
const TextBox = require('../Dialog/TextBox');
const YesNoMsgBox = require('../Dialog/YesNoMsgBox');

// Factory.
describe('Factory', function () {
  let map = {
    checkBox: CheckBox,
    dropDown: DropDown,
    fileSave: FileSave,
    fileSelect: FileSelect,
    inputBox: InputBox,
    msgBox: MsgBox,
    notify: Notify,
    okMsgBox: OkMsgBox,
    progressBar: ProgressBar,
    radio: Radio,
    secureInputBox: SecureInputBox,
    secureStandardInputBox: SecureStandardInputBox,
    slider: Slider,
    standardDropdown: StandardDropDown,
    standardInputBox: StandardInputBox,
    textBox: TextBox,
    yesNoMsgBox: YesNoMsgBox,
  };
  let options = {
    debug: true,
    stringOutput: true
  };
  let Factory = require('../index').setGlobalOption(options);
  for (let method in map) {
    if (!map.hasOwnProperty(method)) {
      continue;
    }
    let ControlClass = map[method];
    it(`should create ${ControlClass.name}, using .${method}() and set global options`, function () {
      let ControlInstance = Factory[method]();
      assert.strictEqual(ControlInstance instanceof ControlClass, true);
      assert.controlArgs(ControlInstance, '--debug --string-output');
    });
  }
});

// Core.
describe('Core', function () {

  test.instanceOf(new CocoaDialogError(), Error);
  test.instanceOf(new CocoaDialogAbort(), [Error, CocoaDialogError]);
  test.instanceOf(new CocoaDialogTimeout(), [Error, CocoaDialogError, CocoaDialogAbort]);

  // Control.
  test.control(Control.bind(Control, 'Control'), null, ControlResult, function (instance) {
    it(`should throw CocoaDialogError on invalid control type`, function () {
      let func = function () {
        new Control('InvalidControl')
      };
      assert.throws(func, CocoaDialogError);
    });
    instance.testMethod('debug', [true], '--debug');
    instance.testMethod('debug', [false], '');
    instance.testMethod('float', [true], '');
    instance.testMethod('float', [false], '--no-float');
    instance.testMethod('setHeight', [300], '--height 300');
    instance.testMethod('setIcon', ['caution'], '--icon caution');
    instance.testMethod('setIconFromBundle', ['com.apple.something'], '--icon-bundle com.apple.something');
    instance.testMethod('setIconFromFile', ['/foo/bar/baz.png'], '--icon-file /foo/bar/baz.png');
    instance.testMethod('setIconSize', [32], '--icon-height 32 --icon-width 32');
    instance.testMethod('setIconSize', [{height: 48, width: 32}], '--icon-height 48 --icon-width 32');
    instance.testMethod('setIconType', ['png'], '--icon-type png');
    instance.testMethod('setOption', ['debug', true], '--debug');
    instance.testMethod('setOption', ['invalidOption', 'value'], '');
    instance.testMethod('setPosition', [200, 300], '--posX 200 --posY 300');
    instance.testMethod('setSize', [200, 300], '--height 300 --width 200');
    instance.testMethod('setTitle', ['Title'], '--title Title');
    instance.testMethod('setTimeout', [60], '--timeout 60');
    instance.testMethod('setTimeout', [60, '%r...'], '--timeout 60 --timeout-format %r...');
    instance.testMethod('setWidth', [500], '--width 500');
    instance.testMethod('stringOutput', [true], '--string-output');
    instance.testMethod('stringOutput', [false], '');
  });

  // FileControl.
  test.control(FileControl.bind(Control, 'FileControl'), Control, ControlResult, function (instance) {
    instance.testMethod('createDirectories', [true], '--create-directories');
    instance.testMethod('createDirectories', [false], '');
    instance.testMethod('packagesAsDirectories', [true], '--packages-as-directories');
    instance.testMethod('packagesAsDirectories', [false], '');
    instance.testMethod('setDirectory', ['/foo/bar/baz'], '--with-directory /foo/bar/baz');
    instance.testMethod('setExtensions', ['foo', 'bar', 'baz'], '--with-extensions foo bar baz');
    instance.testMethod('setExtensions', [['foo', 'bar', 'baz']], '--with-extensions foo bar baz');
    instance.testMethod('setFile', ['/foo/bar.baz'], '--with-file /foo/bar.baz');
    instance.testMethod('setLabel', ['Label'], '--label Label');
  });

  // ThreeButtonControl.
  test.control(ThreeButtonControl.bind(Control, 'ThreeButtonControl'), Control, [ControlResult, ThreeButtonControlResult], function (instance) {
    instance.testMethod('setButtons', ['Button1'], '--button1 Button1');
    instance.testMethod('setButtons', ['Button1', 'Button2'], '--button1 Button1 --button2 Button2');
    instance.testMethod('setButtons', ['Button1', 'Button2', 'Button3'], '--button1 Button1 --button2 Button2 --button3 Button3');
    instance.testMethod('setButtons', ['Button1', 'Button2', 'Button3', 'Button4'], '--button1 Button1 --button2 Button2 --button3 Button3');
    instance.testMethod('setEmptyText', ['Value Required!'], '--empty-text Value Required!');
    instance.testMethod('setLabel', ['Label'], '--label Label');
    instance.testMethod('valueRequired', [true], '--value-required');
    instance.testMethod('valueRequired', [false], '');
  });

});

// Controls.
describe('Control', function () {

  // CheckBox.
  test.control(CheckBox, [Control, ThreeButtonControl], [ControlResult, ThreeButtonControlResult, CheckBoxResult], function (instance) {
    instance.testMethod('setChecked', [[2,4,12]], '--checked 2 4 12');
    instance.testMethod('setColumns', [3], '--columns 3');
    instance.testMethod('setColumns', [0], '');
    instance.testMethod('setDisabled', [[3,9,10]], '--disabled 3 9 10');
    instance.testMethod('setItems', [['Checkbox 1', 'Checkbox 2', 'Checkbox 3', 'Checkbox 4']], '--items Checkbox 1 Checkbox 2 Checkbox 3 Checkbox 4');
    instance.testMethod('setMixed', [[1,5,7]], '--mixed 1 5 7');
    instance.testMethod('setRows', [4], '--rows 4');
    instance.testMethod('setRows', [0], '');
  });

  // DropDown.
  test.control(DropDown, [Control, ThreeButtonControl], [ControlResult, ThreeButtonControlResult, InputResult], function (instance) {
    instance.testMethod('exitOnChange', [true], '--exit-onchange');
    instance.testMethod('exitOnChange', [false], '');
    instance.testMethod('pullDown', [true], '--pulldown');
    instance.testMethod('pullDown', [false], '');
    instance.testMethod('setItems', [['Item 1', 'Item 2', 'Item 3', 'Item 4']], '--items Item 1 Item 2 Item 3 Item 4');
    instance.testMethod('setSelected', [3], '--selected 3');
  });

  // FileSave.
  test.control(FileSave, [Control, FileControl], [ControlResult, FileSaveResult], function (instance) {
    instance.testMethod('createDirectories', [true], '--create-directories');
    instance.testMethod('createDirectories', [false], '--no-create-directories');
  });

  // FileSelect.
  test.control(FileSelect, [Control, FileControl], [ControlResult, FileSelectResult], function (instance) {
    instance.testMethod('selectDirectories', [true], '--select-directories');
    instance.testMethod('selectDirectories', [false], '--no-select-directories');
    instance.testMethod('selectDirectories', [true, true], '--select-directories --select-only-directories');
    instance.testMethod('selectDirectories', [false, true], '--no-select-directories');
    instance.testMethod('selectMultiple', [true], '--select-multiple');
    instance.testMethod('selectMultiple', [false], '--no-select-multiple');
    instance.testMethod('setAllowedFiles', [['foo', 'bar', 'baz']], '--allowed-files foo bar baz');
  });

  // InputBox.
  test.control(InputBox, [Control, ThreeButtonControl], [ControlResult, ThreeButtonControlResult, InputResult], function (instance) {
    instance.testMethod('blur', [true], '--not-selected');
    instance.testMethod('blur', [false], '');
    instance.testMethod('password', [true], '--no-show');
    instance.testMethod('password', [false], '');
    instance.testMethod('setValue', ['value'], '--value value');
  });

  // MsgBox.
  test.control(MsgBox, [Control, ThreeButtonControl], [ControlResult, ThreeButtonControlResult], function (instance) {
    instance.testMethod('setAlert', ['value'], '--alert value');
  });

  // Notify.
  // @todo Add methods and testing (big task).
  test.control(Notify, Control, ControlResult);

  // OkMsgBox.
  test.control(OkMsgBox, [Control, ThreeButtonControl, MsgBox], [ControlResult, ThreeButtonControlResult], function (instance) {
    instance.testMethod('noCancel', [true], '--no-cancel');
    instance.testMethod('noCancel', [false], '');
  });

  // ProgressBar.
  test.control(ProgressBar, Control, [ControlResult, ProgressBarResult], function (instance) {
    instance.testMethod('indeterminate', [true], '--indeterminate');
    instance.testMethod('indeterminate', [false], '');
    instance.testMethod('setPercent', [30], '--percent 30');
    instance.testMethod('setText', ['value'], '--text value');
    instance.testMethod('stoppable', [true], '--stoppable');
    instance.testMethod('stoppable', [false], '');
  });

  // Radio.
  test.control(Radio, [Control, ThreeButtonControl], [ControlResult, ThreeButtonControlResult, RadioResult], function (instance) {
    instance.testMethod('allowMixed', [true], '--allow-mixed');
    instance.testMethod('allowMixed', [false], '');
    instance.testMethod('setColumns', [3], '--columns 3');
    instance.testMethod('setColumns', [0], '');
    instance.testMethod('setDisabled', [[3,9,10]], '--disabled 3 9 10');
    instance.testMethod('setItems', [['Checkbox 1', 'Checkbox 2', 'Checkbox 3', 'Checkbox 4']], '--items Checkbox 1 Checkbox 2 Checkbox 3 Checkbox 4');
    instance.testMethod('setMixed', [[1,5,7]], '--mixed 1 5 7');
    instance.testMethod('setRows', [4], '--rows 4');
    instance.testMethod('setRows', [0], '');
    instance.testMethod('setSelected', [3], '--selected 3');
  });

  // SecureInputBox.
  test.control(SecureInputBox, [Control, ThreeButtonControl, InputBox], [ControlResult, ThreeButtonControlResult, InputResult]);

  // SecureStandardInputBox.
  test.control(SecureStandardInputBox, [Control, ThreeButtonControl, InputBox, StandardInputBox], [ControlResult, ThreeButtonControlResult, InputResult]);

  // Slider.
  test.control(Slider, [Control, ThreeButtonControl], [ControlResult, ThreeButtonControlResult, InputResult], function (instance) {
    instance.testMethod('alwaysShowValue', [true], '--always-show-value');
    instance.testMethod('alwaysShowValue', [false], '');
    instance.testMethod('returnFloat', [true], '--return-float');
    instance.testMethod('returnFloat', [false], '');
    instance.testMethod('setEmptyValue', [5], '--empty-value 5');
    instance.testMethod('setMax', [100], '--max 100');
    instance.testMethod('setMin', [0], '--min 0');
    instance.testMethod('setSliderLabel', ['Label for slider'], '--slider-label Label for slider');
    instance.testMethod('setTicks', [10], '--ticks 10');
    instance.testMethod('setValue', [44], '--value 44');
    instance.testMethod('sticky', [true], '--sticky');
    instance.testMethod('sticky', [false], '');
  });

  // StandardInputBox.
  test.control(StandardInputBox, [Control, ThreeButtonControl, InputBox], [ControlResult, ThreeButtonControlResult, InputResult], function (instance) {
    instance.testMethod('noCancel', [true], '--no-cancel');
    instance.testMethod('noCancel', [false], '');
  });

  // StandardDropDown.
  test.control(StandardDropDown, [Control, ThreeButtonControl, DropDown], [ControlResult, ThreeButtonControlResult, InputResult], function (instance) {
    instance.testMethod('noCancel', [true], '--no-cancel');
    instance.testMethod('noCancel', [false], '');
  });

  // TextBox.
  test.control(TextBox, [Control, ThreeButtonControl], [ControlResult, ThreeButtonControlResult, InputResult], function (instance) {
    instance.testMethod('editable', [true], '--editable');
    instance.testMethod('editable', [false], '--no-editable');
    instance.testMethod('focus', [true], '--focus-textbox');
    instance.testMethod('focus', [false], '');
    instance.testMethod('scrollToBottom', [true], '--scroll-to bottom');
    instance.testMethod('scrollToBottom', [false], '');
    instance.testMethod('selectAll', [true], '--selected');
    instance.testMethod('selectAll', [false], '');
    instance.testMethod('setFile', ['/foo/bar/baz.txt'], '--text-from-file /foo/bar/baz.txt');
    instance.testMethod('setText', ['text'], '--text text');
  });

  // YesNoMsgBox.
  test.control(YesNoMsgBox, [Control, ThreeButtonControl, MsgBox], [ControlResult, ThreeButtonControlResult], function (instance) {
    instance.testMethod('noCancel', [true], '--no-cancel');
    instance.testMethod('noCancel', [false], '');
  });

});

describe('JSON', function () {
  let promise;

  before(function () {
    let control = new Control('Control');
    control.getArguments = () => ['--color', 0, '--help', '--output', 'json'];
    promise = control.open()
      .then(result => JSON.parse(result.raw.stdout))
      .catch(result => done(result.error));
  });

  it('should parse global options', function () {
    return promise.then(json => {
      assert.ok('JSON successfully parsed');
    });
  });
});

