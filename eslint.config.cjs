const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        window:       "readonly",
        document:     "readonly",
        localStorage: "readonly",
        Math:         "readonly",
        eval:         "readonly",
        console:      "readonly",
        isFinite:     "readonly",
        isNaN:        "readonly",
        module:       "readonly",
        require:      "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef":       "error"
    }
  }
];