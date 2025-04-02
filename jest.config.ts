import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    rootDir: 'src',
    testMatch: ['**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/$1',
    },
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    
};

export default config;
