//const cocoaDialog = require('cocoadialog');
const cocoaDialog = require('../index').setGlobalOption({
  debug: process.argv.indexOf('--debug') !== -1,
  stringOutput: true
});

let msgBox;

// Configure the dialog.
msgBox = cocoaDialog.msgBox({ close: true, minimize: true })
  .setButtons('Ok', 'Cancel', 'Reject')
  .setIcon('caution', 32) // Or specifically with {width: 32, height: 32}.
  .setLabel('This is the label.')
  .setTimeout(60, `You'd better hurry! %r left...`)
  .setTitle('This is the title')

  // Events.
  .on('abort', result => {
    if (result.control.options.debug) {
      console.log('Event triggered: abort');
    }
  })
  .on('close', result => {
    if (result.control.options.debug) {
      console.log('Event triggered: close');
    }
  })
  .on('error', result => {
    if (result.control.options.debug) {
      console.log('Event triggered: error');
    }
  })
  .on('result', result => {
    if (result.control.options.debug) {
      console.log('Event triggered: result');
    }
  })
  .on('stderr', result => {
    if (result.control.options.debug) {
      console.log('Event triggered: stderr');
    }
  })
  .on('stdout', result => {
    if (result.control.options.debug) {
      console.log('Event triggered: stdout');
    }
  })
  .on('timeout', result => {
    if (result.control.options.debug) {
      console.log('Event triggered: timeout');
    }
  });

// Open the dialog.
msgBox.open()
  .then(result => {
    if (result.control.options.debug) {
      console.log('then(1)');
    }

    switch (result.button) {
      case 'Ok':
        console.log('Ok button was clicked.');
        break;

      case 'Reject':
        return Promise.reject(result.abort('Reject button was clicked.'));
        break;
    }


    if (result.control.options.debug) {
      console.log('Done!');
    }
  })
  .then(process.exit)

  // If a control fails, it will reject the promise. You must handle the result
  // appropriately based on your application's needs.
  .catch(result => {
    if (result.control.options.debug) {
      console.log('catch(1)');
    }

    // It's generally considered best practice to exit with a "timeout" status.
    if (result.hasTimedOut()) {
      console.error('Dialog has timed out.');
      process.exit(124);
    }
    else if (result.hasAborted()) {
      console.error(result.error.message);
      process.exit(1);
    }
    else {
      console.error(result.control.options.debug && result.error.stack ? result.error.stack : result.error.message);
      process.exit(255);
    }
  })

;
