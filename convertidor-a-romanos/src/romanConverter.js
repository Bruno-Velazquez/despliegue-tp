class RomanConverter {
    static romanToInt(roman) {
        if (!roman || typeof roman !== 'string') {
            throw new Error('Input must be a non-empty string');
        }

        const romanNumerals = {
            'I': 1, 'V': 5, 'X': 10, 'L': 50,
            'C': 100, 'D': 500, 'M': 1000
        };

        let result = 0;
        const upperRoman = roman.toUpperCase();

        const validChars = /^[IVXLCDM]+$/i;
        if (!validChars.test(upperRoman)) {
            const invalidChar = upperRoman.split('').find(char => !romanNumerals[char]);
            throw new Error(`Invalid Roman numeral: ${invalidChar || 'Invalid characters'}`);
        }

        this.validateRomanNumeral(upperRoman);

        for (let i = 0; i < upperRoman.length; i++) {
            const current = romanNumerals[upperRoman[i]];
            const next = romanNumerals[upperRoman[i + 1]];

            if (next && current < next) {
                if (!this.isValidSubtraction(upperRoman[i], upperRoman[i + 1])) {
                    throw new Error(`Invalid Roman numeral: Invalid subtraction "${upperRoman[i]}${upperRoman[i + 1]}"`);
                }
                result -= current;
            } else {
                result += current;
            }
        }

        return result;
    }

    static isValidSubtraction(smaller, larger) {
        const validSubtractions = {
            'I': ['V', 'X'],
            'X': ['L', 'C'],
            'C': ['D', 'M']
        };
        return validSubtractions[smaller] && validSubtractions[smaller].includes(larger);
    }

    static validateRomanNumeral(roman) {
        const invalidPatterns = [
            /IIII/, /XXXX/, /CCCC/, /MMMM/,
            /VV/, /LL/, /DD/,
            /IL/, /IC/, /ID/, /IM/,
            /VX/, /VL/, /VC/, /VD/, /VM/,
            /XD/, /XM/,
            /LC/, /LD/, /LM/,
            /DM/
        ];

        for (const pattern of invalidPatterns) {
            if (pattern.test(roman)) {
                throw new Error(`Invalid Roman numeral: "${roman}" violates Roman numeral rules`);
            }
        }

        this.validateSubtractionRules(roman);
    }

    static validateSubtractionRules(roman) {
        for (let i = 0; i < roman.length - 1; i++) {
            const current = roman[i];
            const next = roman[i + 1];
            const currentVal = this.getRomanValue(current);
            const nextVal = this.getRomanValue(next);
            
            if (currentVal < nextVal) {
                if (!this.isValidSubtraction(current, next)) {
                    throw new Error(`Invalid Roman numeral: "${current}${next}" is not a valid subtraction`);
                }
                
                if (i < roman.length - 2) {
                    const nextNextVal = this.getRomanValue(roman[i + 2]);
                    if (nextNextVal > currentVal) {
                        throw new Error(`Invalid Roman numeral: Multiple subtractions not allowed`);
                    }
                }
            }
        }
    }

    static getRomanValue(char) {
        const values = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
        return values[char] || 0;
    }

    static intToRoman(num) {
        if (!Number.isInteger(num) || num <= 0 || num > 3999) {
            throw new Error('Number must be an integer between 1 and 3999');
        }

        const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

        let result = '';
        let remaining = num;

        for (let i = 0; i < values.length; i++) {
            while (remaining >= values[i]) {
                result += numerals[i];
                remaining -= values[i];
            }
        }

        return result;
    }

    static convert(input) {
        if (typeof input === 'string') {
            return this.romanToInt(input);
        } else if (typeof input === 'number') {
            return this.intToRoman(input);
        } else {
            throw new Error('Input must be a string (Roman numeral) or number');
        }
    }
}

module.exports = RomanConverter;
