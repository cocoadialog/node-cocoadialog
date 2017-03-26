//const cocoaDialog = require('cocoadialog');
const cocoaDialog = require('../index').setGlobalOption({
  debug: process.argv.indexOf('--debug') !== -1,
  stringOutput: true
});

const itemsToProcess = [
  {label: 'One'},
  {label: 'Two'},
  {label: 'Three'},
  {label: 'Four'},
  {label: 'Five'},
  {label: 'Six'},
  {label: 'Seven'},
  {label: 'Eight'},
  {label: 'Nine'},
  {label: 'Ten'}
];

let progressBar;

// Configure the dialog.
progressBar = cocoaDialog.progressBar()
  .setIcon('gear')
  .setTimeout(60, `You'd better hurry! %r left...`)
  .setTitle('This is the title')
  .setStoppable()

  .processItems(itemsToProcess, (item, i, total, progressBar) => {
    let label = `Processing #${i + 1}...`;
    progressBar.setText(label);

    // You can return promises here for async functions.
    return new Promise(resolve => {
      setTimeout(() => {
        item.label = label;
        progressBar.setText(`${label} done!`);
        resolve();
      }, 800);
    });
  })

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
  })

  // ProgressBar specific events.
  .on('beforeUpdate', (progressBar) => {
    if (progressBar.options.debug) {
      console.log(`Event triggered: beforeUpdate`);
    }
  })
  .on('update', (progressBar) => {
    if (progressBar.options.debug) {
      console.log(`Event triggered: update`);
    }
  })

;

// Open the dialog.
progressBar.open()
  .then(result => {
    console.log(result.items);
  })
  .then(process.exit)
  .catch(result => {
    // It's generally considered best practice to exit with a "timeout" status.
    if (result.hasTimedOut()) {
      console.error('Processing has timed out.');
      process.exit(124);
    }
    else if (result.hasAborted()) {
      console.error('Stop button was clicked.');
      process.exit(1);
    }
    else {
      console.error(result.control.options.debug && result.error.stack ? result.error.stack : result.error.message);
      process.exit(255);
    }
  })
;
