# cocoadialog

> Node.js wrapper for [cocoaDialog]

**Note:** Issues with the actual cocoaDialog application should be filed in its [issue queue](https://github.com/mstratman/cocoadialog/issues).


## Install

```
$ npm install --save cocoadialog
```


## Basic Usage

```js
const cocoaDialog = require('cocoadialog').setGlobalOption({
  stringOutput: true
});

cocoaDialog.msgBox()
  .setTitle('This is the title')
  .setIcon('caution')
  .setLabel('This is the label')
  .setButtons('Ok', 'Cancel', 'More')
  .open()
  .then(result => {
    if (result.button === 'Ok') {
      console.log('Ok button was clicked.');
    }
    else if (result.button === 'More') {
      console.log('More button was clicked.');
    }
  })
  .catch(result => {
    if (result.hasAborted()) {
      console.log('Cancel button was clicked.');
    }
    else {
      console.error(result.error);
    }
  });
```

## Advanced Usage

**Note:** You can append the `--debug` flag at the end of these examples for
extremely verbose console output.

- [MsgBox.js](./Examples/MsgBox.js) - `node ./Examples/MsgBox.js`
- [ProgressBar.js](./Examples/ProgressBar.js) - `node ./Examples/ProgressBar.js`


## API

WIP

#### options

WIP

## License

MIT © [Mark Carver](https://github.com/markcarver)

[cocoaDialog]: http://mstratman.github.io/cocoadialog/#documentation3.0
