module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  setupFiles: ["./src/setupTests.js"], // Include setup file for dotenv
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
