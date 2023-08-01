const config = {
  printWidth: 120,
  trailingComma: "es5",
  overrides: [
    {
      files: [".eslintrc.js", ".prettierrc.js", "*.json", "*.md"],
      options: {
        printWidth: 80,
      },
    },
  ],
};

export default config;
