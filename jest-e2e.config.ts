import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    rootDir: 'test',
    testMatch: ['**/*.e2e-spec.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/../src/$1',
    },
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
};

export default config;
