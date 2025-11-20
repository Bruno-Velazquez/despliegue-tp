// Mock completo de un módulo
jest.mock('../romanConverter', () => {
    return {
        romanToInt: jest.fn().mockImplementation((input) => {
            if (input === 'X') return 10;
            if (input === 'V') return 5;
            return 0;
        }),
        intToRoman: jest.fn().mockImplementation((number) => {
            if (number === 10) return 'X';
            if (number === 5) return 'V';
            return 'I';
        })
    };
});

const MockedRomanConverter = require('../romanConverter');

describe('Tests con Mock de Módulo Completo', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should use completely mocked module', () => {
        // Act
        const result1 = MockedRomanConverter.romanToInt('X');
        const result2 = MockedRomanConverter.intToRoman(10);
        
        // Assert
        expect(result1).toBe(10);
        expect(result2).toBe('X');
        expect(MockedRomanConverter.romanToInt).toHaveBeenCalledWith('X');
        expect(MockedRomanConverter.intToRoman).toHaveBeenCalledWith(10);
    });

    test('mocked functions should track calls', () => {
        // Act
        MockedRomanConverter.romanToInt('V');
        MockedRomanConverter.romanToInt('X');
        MockedRomanConverter.intToRoman(5);
        
        // Assert
        expect(MockedRomanConverter.romanToInt).toHaveBeenCalledTimes(2);
        expect(MockedRomanConverter.intToRoman).toHaveBeenCalledTimes(1);
    });
});