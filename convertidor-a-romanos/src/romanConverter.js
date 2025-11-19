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

        for (let i = 0; i < upperRoman.length; i++) {
            const current = romanNumerals[upperRoman[i]];
            const next = romanNumerals[upperRoman[i + 1]];

            if (!current) {
                throw new Error(`Invalid Roman numeral: ${upperRoman[i]}`);
            }

            if (next && current < next) {
                result -= current;
            } else {
                result += current;
            }
        }

        return result;
    }

    static intToRoman(num) {
        if (!Number.isInteger(num) || num <= 0 || num > 3999) {
            throw new Error('EROR, SOLO HASTA 3999' );
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