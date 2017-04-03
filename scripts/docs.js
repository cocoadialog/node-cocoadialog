const Docma = require('docma');
const pkg = require('../package.json');

Docma.create()
  .build({
    src: [
      './Core/**/*.js', './Dialog/**/*.js',
      {
        guide: './README.md',
        examples: './Examples/README.md',
        msgbox: './Examples/MsgBox.md',
        progressbar: './Examples/ProgressBar.md'
      }
    ],
    dest: './docs',
    app: {
      base: '/node-cocoadialog',
      title: `${pkg.name} (node.js)`,
      routing: 'query',
      entrance: 'content:guide'
    },
    jsdoc: {
      hierarchy: true,
      sort: 'grouped',
      package: true
    },
    template: {
      path: 'default',
      options: {
        title: `${pkg.name} (node.js)`,
        sidebar: true,
        collapsed: false,
        outline: 'tree',
        badges: true,
        search: true,
        symbolMeta: true,
        navbar: true,
        navItems: [
          {
            label: 'Getting Started',
            href: '/',
            iconClass: 'ico-target4'
          },
          {
            label: 'API',
            href: '/?api',
            iconClass: 'ico-book'
          },
          {
            label: 'Examples',
            href: '/?content=examples',
            iconClass: 'ico-mouse-pointer'
          },
          {
            label: 'Releases',
            iconClass: 'ico-md ico-download',
            target: '_blank',
            href: `${pkg.homepage}/releases`,
          },
          {
            label: 'GitHub',
            href: pkg.homepage,
            target: '_blank',
            iconClass: 'ico-md ico-github'
          }
        ]
      }
    },

  })
  .then(function (success) {
    console.log('Documentation is built successfully.');
  })
  .catch(function (error) {
    console.log(error.message);
  });


