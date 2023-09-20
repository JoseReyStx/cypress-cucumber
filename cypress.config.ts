import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";


export default defineConfig({
  e2e: {
    async setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      const bundler =
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
    baseUrl: "https://duckduckgo.com",
    specPattern: "cypress/e2e/features/*.feature",
    // specPattern: "cypress\\e2e\\features\\duckduckgo.feature",
  },
});