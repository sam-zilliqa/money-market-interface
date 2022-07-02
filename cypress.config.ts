import webpackPreprocessor from '@cypress/webpack-preprocessor';
import { defineConfig } from 'cypress';
import findWebpack from 'find-webpack';

const webpackOptions = findWebpack.getWebpackOptions();
const options = {
  webpackOptions,
  watchOptions: {},
};

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      // implement node event listeners here
      // on('file:preprocessor', webpack(options));
      // use a module that carefully removes only plugins
      // that we found to be breaking the bundling
      // https://github.com/bahmutov/find-webpack
      const cleanOptions = {
        reactScripts: true,
      };

      findWebpack.cleanForCypress(cleanOptions, webpackOptions);
      on('file:preprocessor', webpackPreprocessor(options));
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
});
