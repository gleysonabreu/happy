module.exports = {
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.ts?(x)'],
  rootDir: '.',
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/config/**',
    'src/modules/**',
    'src/shared/**',
    '!src/shared/infra/typeorm/migrations/**',
    '!src/modules/**/dtos/**',
    '!src/modules/*/repositories/**',
    '!src/shared/infra/http/server.ts',
  ],
  coverageDirectory: 'src/__tests__/coverage',
};
