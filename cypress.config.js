const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    supportFile: 'cypress/support/index.js',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
