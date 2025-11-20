const RomanConverter = require('../romanConverter');

describe('Tests con Spy - Conversor Romano', () => {
    let originalConsoleLog;

    beforeEach(() => {
        // Guardar console.log original
        originalConsoleLog = console.log;
        console.log = jest.fn(); // Mock de console.log
    });

    afterEach(() => {
        // Restaurar console.log original
        console.log = originalConsoleLog;
    });

    // Test 1: Spy en console.log
    test('should spy on console.log calls', () => {
        // Act
        console.log('Testing Roman Converter');
        console.log('Input: XIV, Output: 14');
        
        // Assert
        expect(console.log).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenCalledWith('Testing Roman Converter');
        expect(console.log).toHaveBeenCalledWith('Input: XIV, Output: 14');
    });

    // Test 2: Mock temporal de un método
    test('should temporarily mock a method', () => {
        // Arrange
        const originalMethod = RomanConverter.romanToInt;
        RomanConverter.romanToInt = jest.fn().mockReturnValue(999);
        
        // Act
        const result = RomanConverter.romanToInt('anything');
        
        // Assert
        expect(result).toBe(999);
        expect(RomanConverter.romanToInt).toHaveBeenCalledWith('anything');
        
        // Restaurar método original
        RomanConverter.romanToInt = originalMethod;
    });

    // Test 3: Usando jest.spyOn (más limpio)
    test('should use jest.spyOn to track method calls', () => {
        // Arrange
        const spy = jest.spyOn(RomanConverter, 'intToRoman');
        
        // Act
        const result1 = RomanConverter.intToRoman(5);
        const result2 = RomanConverter.intToRoman(10);
        
        // Assert
        expect(result1).toBe('V');
        expect(result2).toBe('X');
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith(5);
        expect(spy).toHaveBeenCalledWith(10);
        
        // Limpiar el spy
        spy.mockRestore();
    });
});