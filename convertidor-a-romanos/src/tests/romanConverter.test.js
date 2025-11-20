const RomanConverter = require('../romanConverter');

describe('Roman Converter', () => {
    describe('Roman to Integer', () => {
        test('should convert basic Roman numerals', () => {
            expect(RomanConverter.romanToInt('I')).toBe(1);
            expect(RomanConverter.romanToInt('V')).toBe(5);
            expect(RomanConverter.romanToInt('X')).toBe(10);
            expect(RomanConverter.romanToInt('L')).toBe(50);
            expect(RomanConverter.romanToInt('C')).toBe(100);
            expect(RomanConverter.romanToInt('D')).toBe(500);
            expect(RomanConverter.romanToInt('M')).toBe(1000);
        });

        test('should convert subtraction cases', () => {
            expect(RomanConverter.romanToInt('IV')).toBe(4);
            expect(RomanConverter.romanToInt('IX')).toBe(9);
            expect(RomanConverter.romanToInt('XL')).toBe(40);
            expect(RomanConverter.romanToInt('XC')).toBe(90);
            expect(RomanConverter.romanToInt('CD')).toBe(400);
            expect(RomanConverter.romanToInt('CM')).toBe(900);
        });

        test('should convert complex Roman numerals', () => {
            expect(RomanConverter.romanToInt('III')).toBe(3);
            expect(RomanConverter.romanToInt('VIII')).toBe(8);
            expect(RomanConverter.romanToInt('XIV')).toBe(14);
            expect(RomanConverter.romanToInt('XIX')).toBe(19);
            expect(RomanConverter.romanToInt('XLII')).toBe(42);
            expect(RomanConverter.romanToInt('XCIX')).toBe(99);
            expect(RomanConverter.romanToInt('CXLIX')).toBe(149);
            expect(RomanConverter.romanToInt('CDXCIX')).toBe(499);
            expect(RomanConverter.romanToInt('MMXXIII')).toBe(2023);
            expect(RomanConverter.romanToInt('MCMXC')).toBe(1990);
            expect(RomanConverter.romanToInt('MMMCMXCIX')).toBe(3999);
        });

        test('should handle lowercase input', () => {
            expect(RomanConverter.romanToInt('xiv')).toBe(14);
            expect(RomanConverter.romanToInt('mix')).toBe(1009);
            expect(RomanConverter.romanToInt('cmxlix')).toBe(949);
        });

        test('should handle edge cases and boundaries', () => {
            expect(RomanConverter.romanToInt('I')).toBe(1);
            expect(RomanConverter.romanToInt('MMMCMXCIX')).toBe(3999);
        });

        test('should throw error for invalid input types', () => {
            expect(() => RomanConverter.romanToInt('')).toThrow('Input must be a non-empty string');
            expect(() => RomanConverter.romanToInt(null)).toThrow('Input must be a non-empty string');
            expect(() => RomanConverter.romanToInt(undefined)).toThrow('Input must be a non-empty string');
            expect(() => RomanConverter.romanToInt(123)).toThrow('Input must be a non-empty string');
            expect(() => RomanConverter.romanToInt({})).toThrow('Input must be a non-empty string');
        });

        test('should throw error for invalid Roman numerals', () => {
            expect(() => RomanConverter.romanToInt('ABC')).toThrow('Invalid Roman numeral: A');
            expect(() => RomanConverter.romanToInt('IIII')).toThrow('Invalid Roman numeral');
            expect(() => RomanConverter.romanToInt('VV')).toThrow('Invalid Roman numeral');
            expect(() => RomanConverter.romanToInt('IC')).toThrow('Invalid Roman numeral');
            expect(() => RomanConverter.romanToInt('VX')).toThrow('Invalid Roman numeral');
        });

        /*test('should handle unconventional but technically valid ordering carefully', () => {
            // Algunas formas no convencionales pueden ser válidas, pero nuestro validador es estricto
            // MDCCCCX (1910) no es la forma estándar pero algunos sistemas lo aceptan
            expect(RomanConverter.romanToInt('MDCCCCX')).toBe(1910);
        });*/
    });

    describe('Integer to Roman', () => {
        test('should convert basic numbers', () => {
            expect(RomanConverter.intToRoman(1)).toBe('I');
            expect(RomanConverter.intToRoman(5)).toBe('V');
            expect(RomanConverter.intToRoman(10)).toBe('X');
            expect(RomanConverter.intToRoman(50)).toBe('L');
            expect(RomanConverter.intToRoman(100)).toBe('C');
            expect(RomanConverter.intToRoman(500)).toBe('D');
            expect(RomanConverter.intToRoman(1000)).toBe('M');
        });

        test('should convert subtraction cases', () => {
            expect(RomanConverter.intToRoman(4)).toBe('IV');
            expect(RomanConverter.intToRoman(9)).toBe('IX');
            expect(RomanConverter.intToRoman(40)).toBe('XL');
            expect(RomanConverter.intToRoman(90)).toBe('XC');
            expect(RomanConverter.intToRoman(400)).toBe('CD');
            expect(RomanConverter.intToRoman(900)).toBe('CM');
        });

        test('should convert complex numbers', () => {
            expect(RomanConverter.intToRoman(3)).toBe('III');
            expect(RomanConverter.intToRoman(8)).toBe('VIII');
            expect(RomanConverter.intToRoman(14)).toBe('XIV');
            expect(RomanConverter.intToRoman(19)).toBe('XIX');
            expect(RomanConverter.intToRoman(42)).toBe('XLII');
            expect(RomanConverter.intToRoman(99)).toBe('XCIX');
            expect(RomanConverter.intToRoman(149)).toBe('CXLIX');
            expect(RomanConverter.intToRoman(499)).toBe('CDXCIX');
            expect(RomanConverter.intToRoman(888)).toBe('DCCCLXXXVIII');
            expect(RomanConverter.intToRoman(1990)).toBe('MCMXC');
            expect(RomanConverter.intToRoman(2023)).toBe('MMXXIII');
            expect(RomanConverter.intToRoman(3999)).toBe('MMMCMXCIX');
        });

        test('should handle edge cases and boundaries', () => {
            expect(RomanConverter.intToRoman(1)).toBe('I');
            expect(RomanConverter.intToRoman(3999)).toBe('MMMCMXCIX');
        });

        test('should throw error for invalid input types', () => {
            expect(() => RomanConverter.intToRoman(0)).toThrow('El número debe estar entre 1 y 3999, inclusive.');
            expect(() => RomanConverter.intToRoman(4000)).toThrow('El número debe estar entre 1 y 3999, inclusive.');
            expect(() => RomanConverter.intToRoman(-1)).toThrow('El número debe estar entre 1 y 3999, inclusive.');
            expect(() => RomanConverter.intToRoman(3.14)).toThrow('El número debe estar entre 1 y 3999, inclusive.');
            expect(() => RomanConverter.intToRoman('10')).toThrow('El número debe estar entre 1 y 3999, inclusive.');
            expect(() => RomanConverter.intToRoman(null)).toThrow('El número debe estar entre 1 y 3999, inclusive.');
            expect(() => RomanConverter.intToRoman(undefined)).toThrow('El número debe estar entre 1 y 3999, inclusive.');
        });

        test('should convert round numbers correctly', () => {
            expect(RomanConverter.intToRoman(100)).toBe('C');
            expect(RomanConverter.intToRoman(500)).toBe('D');
            expect(RomanConverter.intToRoman(1000)).toBe('M');
            expect(RomanConverter.intToRoman(2000)).toBe('MM');
            expect(RomanConverter.intToRoman(3000)).toBe('MMM');
        });
    });

    describe('Convert method (automatic detection)', () => {
        test('should convert Roman to integer automatically', () => {
            expect(RomanConverter.convert('XIV')).toBe(14);
            expect(RomanConverter.convert('xliv')).toBe(44);
            expect(RomanConverter.convert('MMXXIII')).toBe(2023);
        });

        test('should convert integer to Roman automatically', () => {
            expect(RomanConverter.convert(14)).toBe('XIV');
            expect(RomanConverter.convert(44)).toBe('XLIV');
            expect(RomanConverter.convert(2023)).toBe('MMXXIII');
        });

        test('should throw error for invalid input in convert method', () => {
            expect(() => RomanConverter.convert('')).toThrow('Input must be a non-empty string');
            expect(() => RomanConverter.convert(null)).toThrow('Input must be a string (Roman numeral) or number');
            expect(() => RomanConverter.convert(undefined)).toThrow('Input must be a string (Roman numeral) or number');
            expect(() => RomanConverter.convert({})).toThrow('Input must be a string (Roman numeral) or number');
            expect(() => RomanConverter.convert([])).toThrow('Input must be a string (Roman numeral) or number');
            expect(() => RomanConverter.convert(true)).toThrow('Input must be a string (Roman numeral) or number');
        });

        test('should handle boundary values in convert method', () => {
            expect(RomanConverter.convert(1)).toBe('I');
            expect(RomanConverter.convert(3999)).toBe('MMMCMXCIX');
            expect(RomanConverter.convert('I')).toBe(1);
            expect(RomanConverter.convert('MMMCMXCIX')).toBe(3999);
        });
    });

    describe('Edge cases and error messages', () => {
        test('should provide specific error messages', () => {
            // Test para mensajes de error específicos
            try {
                RomanConverter.romanToInt('ABC');
                fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).toContain('Invalid Roman numeral');
            }

            try {
                RomanConverter.intToRoman(0);
                fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).toBe('El número debe estar entre 1 y 3999, inclusive.');
            }

            try {
                RomanConverter.convert(null);
                fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).toBe('Input must be a string (Roman numeral) or number');
            }
        });

        test('should handle whitespace in Roman numerals', () => {
            expect(() => RomanConverter.romanToInt('X IV')).toThrow('Invalid Roman numeral');
        });
    });

    describe('Performance and stress tests', () => {
        test('should handle maximum valid number', () => {
            expect(RomanConverter.intToRoman(3999)).toBe('MMMCMXCIX');
            expect(RomanConverter.romanToInt('MMMCMXCIX')).toBe(3999);
        });

        test('should convert numbers with many repeated symbols', () => {
            expect(RomanConverter.intToRoman(3888)).toBe('MMMDCCCLXXXVIII');
            expect(RomanConverter.romanToInt('MMMDCCCLXXXVIII')).toBe(3888);
        });

        test('should handle all subtraction combinations', () => {
            const subtractionCases = [
                [4, 'IV'], [9, 'IX'],
                [40, 'XL'], [90, 'XC'],
                [400, 'CD'], [900, 'CM']
            ];

            subtractionCases.forEach(([number, roman]) => {
                expect(RomanConverter.intToRoman(number)).toBe(roman);
                expect(RomanConverter.romanToInt(roman)).toBe(number);
            });
        });
    });
});