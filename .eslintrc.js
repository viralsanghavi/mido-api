let baseConfig = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  root: true,
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "prefer-const": "off",
  },
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["jest", "@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "prefer-const": "off",
        "prettier/prettier": [
          "error",
          {
            endOfLine: "auto",
          },
        ],
      },
    },
  ],
};
