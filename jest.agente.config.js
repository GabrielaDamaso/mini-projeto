module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/gerado-ia.test.js'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/script.js'],
  coverageReporters: ['text', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70
    }
  }
};
