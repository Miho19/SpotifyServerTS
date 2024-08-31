import { createDefaultEsmPreset, type JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  setupFiles: ["dotenv/config"],
  testEnvironment: "node",
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  extensionsToTreatAsEsm: [".ts"],
  roots: ["<rootDir>/src"],

  transform: { ...createDefaultEsmPreset().transform },
};

export default jestConfig;
