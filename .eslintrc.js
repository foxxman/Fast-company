module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    // 'multiline-ternary':['off']
    // semi: [2, "always"],
    // "space-before-function-paren": [
    //   "error",
    //   { anonymous: "always", named: "never" }
    // ],
    // "multiline-ternary": ["error", "never"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],
    // indent: ["error", 2],
    quotes: ["error", "double", { allowTemplateLiterals: true }]
  }
};
