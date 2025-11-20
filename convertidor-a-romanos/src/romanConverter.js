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

        // Validar caracteres permitidos
        const validChars = /^[IVXLCDM]+$/i;
        if (!validChars.test(upperRoman)) {
            const invalidChar = upperRoman.split('').find(char => !romanNumerals[char]);
            throw new Error(`Invalid Roman numeral: ${invalidChar || 'Invalid characters'}`);
        }

        // Validar reglas básicas de números romanos (menos estricto)
        this.validateRomanNumeral(upperRoman);

        for (let i = 0; i < upperRoman.length; i++) {
            const current = romanNumerals[upperRoman[i]];
            const next = romanNumerals[upperRoman[i + 1]];

            if (next && current < next) {
                // Validar que la resta sea válida
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
        // Reglas de validación básicas (menos restrictivas)
        const invalidPatterns = [
            /IIII/, /XXXX/, /CCCC/, /MMMM/, // Más de 3 repeticiones
            /VV/, /LL/, /DD/, // Repetición de V, L, D
            /IL/, /IC/, /ID/, /IM/, // Restas inválidas con I
            /VX/, /VL/, /VC/, /VD/, /VM/, // Restas inválidas con V
            /XD/, /XM/, // Restas inválidas con X (excepto en casos históricos)
            /LC/, /LD/, /LM/, // Restas inválidas con L
            /DM/ // Restas inválidas con D
        ];

        for (const pattern of invalidPatterns) {
            if (pattern.test(roman)) {
                throw new Error(`Invalid Roman numeral: "${roman}" violates Roman numeral rules`);
            }
        }

        // Validación adicional para símbolos que no pueden restar múltiples veces
        this.validateSubtractionRules(roman);
    }

    static validateSubtractionRules(roman) {
        // Un símbolo solo puede restar a uno de los dos símbolos siguientes inmediatos
        for (let i = 0; i < roman.length - 1; i++) {
            const current = roman[i];
            const next = roman[i + 1];
            const currentVal = this.getRomanValue(current);
            const nextVal = this.getRomanValue(next);
            
            // Si es una resta
            if (currentVal < nextVal) {
                // Verificar que sea una resta válida
                if (!this.isValidSubtraction(current, next)) {
                    throw new Error(`Invalid Roman numeral: "${current}${next}" is not a valid subtraction`);
                }
                
                // No puede haber otro símbolo después en una resta múltiple
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
            throw new Error('El número debe estar entre 1 y 3999, inclusive.');
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