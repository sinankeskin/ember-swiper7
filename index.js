'use strict';

module.exports = {
  name: require('./package').name,
  options: {
    autoImport: {
      alias: {
        swiper$: 'swiper',
      },
    },
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
  },
  included(app) {
    this._super.included.apply(this, arguments);

    const addons = app.project?.addonPackages || app.registry?.availablePlugins;
    const hasSass = !!addons['ember-cli-sass'];
    const hasLess = !!addons['ember-cli-less'];

    if (!hasSass && !hasLess) {
      app.import('node_modules/swiper/swiper.min.css');
    }
  },
};
