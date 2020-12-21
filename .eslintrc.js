module.exports = {
    parser: "@typescript-eslint/parser", 
      ecmaVersion: 2020, 
      sourceType: "module" 
    },
    extends: [
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended"
    ],
    rules: {}
}
