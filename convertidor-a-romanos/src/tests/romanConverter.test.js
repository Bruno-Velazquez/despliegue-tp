const RomanConverter = require('../romanConverter');

describe('Roman Converter', () => {
    describe('Roman to Integer', () => {
        test('should convert basic Roman numerals', () => {
            expect(RomanConverter.romanToInt('I')).toBe(1);
            expect(RomanConverter.romanToInt('V')).toBe(5);
            expect(RomanConverter.romanToInt('X')).toBe(10);
        });

        test('should convert complex Roman numerals', () => {
            expect(RomanConverter.romanToInt('IV')).toBe(4);
            expect(RomanConverter.romanToInt('IX')).toBe(9);
            expect(RomanConverter.romanToInt('XLII')).toBe(42);
            expect(RomanConverter.romanToInt('XCIX')).toBe(99);
            expect(RomanConverter.romanToInt('MMXXIII')).toBe(2023);
        });

        test('should handle lowercase input', () => {
            expect(RomanConverter.romanToInt('xiv')).toBe(14);
        });

        test('should throw error for invalid input', () => {
            expect(() => RomanConverter.romanToInt('')).toThrow();
            expect(() => RomanConverter.romanToInt('ABC')).toThrow();
        });
    });

    describe('Integer to Roman', () => {
        test('should convert basic numbers', () => {
            expect(RomanConverter.intToRoman(1)).toBe('I');
            expect(RomanConverter.intToRoman(5)).toBe('V');
            expect(RomanConverter.intToRoman(10)).toBe('X');
        });

        test('should convert complex numbers', () => {
            expect(RomanConverter.intToRoman(4)).toBe('IV');
            expect(RomanConverter.intToRoman(9)).toBe('IX');
            expect(RomanConverter.intToRoman(42)).toBe('XLII');
            expect(RomanConverter.intToRoman(99)).toBe('XCIX');
            expect(RomanConverter.intToRoman(2023)).toBe('MMXXIII');
        });

        test('should throw error for invalid input', () => {
            expect(() => RomanConverter.intToRoman(0)).toThrow();
            expect(() => RomanConverter.intToRoman(4000)).toThrow();
            expect(() => RomanConverter.intToRoman(3.14)).toThrow();
        });
    });
});