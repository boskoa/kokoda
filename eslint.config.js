const globals = require("globals");
const pluginJs = require("@eslint/js");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest, ...globals.cypress },
    },
  },
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      "dist",
      //"frontend-kokoda",
      ".env",
      "node_modules",
      "cypress.config.js",
      "**/stats.html",
    ],
  },
];
