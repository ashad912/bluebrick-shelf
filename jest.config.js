module.exports = {
    roots: ['<rootDir>'],
    testPathIgnorePatterns: ['/utils/'],
    moduleNameMapper: {
        '^@testUtils(.*)$': '<rootDir>/__tests__/utils$1',
        '^@middleware(.*)$': '<rootDir>/src/middleware$1',
        '^@services(.*)$': '<rootDir>/src/services$1',
        '^@models(.*)$': '<rootDir>/src/models$1',
        '^@errors(.*)$': '<rootDir>/src/errors$1',
    },
    testEnvironment: 'node',
}