const RomanConverter = require('../romanConverter');
const ExternalLogger = require('../externalLogger');

// Mock completo del módulo ExternalLogger
jest.mock('../externalLogger');

describe('Tests con Mocks - Conversor Romano', () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
    });

    // Test 1: Mock de función estática
    test('should log conversion using mocked logger', () => {
        // Arrange - Configurar el mock
        ExternalLogger.logConversion.mockReturnValue(true);
        
        // Act
        const result = RomanConverter.convert(14);
        const logResult = ExternalLogger.logConversion(14, result);
        
        // Assert
        expect(result).toBe('XIV');
        expect(ExternalLogger.logConversion).toHaveBeenCalledTimes(1);
        expect(ExternalLogger.logConversion).toHaveBeenCalledWith(14, 'XIV');
        expect(logResult).toBe(true);
    });

    // Test 2: Mock con implementación personalizada
    test('should mock with custom implementation', () => {
        // Arrange
        let callCount = 0;
        ExternalLogger.logConversion.mockImplementation((input, output) => {
            callCount++;
            return `Mocked call ${callCount}: ${input} -> ${output}`;
        });
        
        // Act
        const result1 = ExternalLogger.logConversion(5, 'V');
        const result2 = ExternalLogger.logConversion(10, 'X');
        
        // Assert
        expect(result1).toBe('Mocked call 1: 5 -> V');
        expect(result2).toBe('Mocked call 2: 10 -> X');
        expect(ExternalLogger.logConversion).toHaveBeenCalledTimes(2);
    });

    // Test 3: Mock de función asíncrona
    test('should mock async function', async () => {
        // Arrange
        const mockData = { id: 456, input: 'XIV', output: 14 };
        ExternalLogger.saveToDatabase.mockResolvedValue(mockData);
        
        // Act
        const result = await ExternalLogger.saveToDatabase({
            input: 'XIV',
            output: 14,
            timestamp: new Date()
        });
        
        // Assert
        expect(result).toEqual(mockData);
        expect(ExternalLogger.saveToDatabase).toHaveBeenCalledTimes(1);
        expect(result.id).toBe(456);
    });

    // Test 4: Mock que simula error
    test('should mock function that throws error', () => {
        // Arrange
        ExternalLogger.logConversion.mockImplementation(() => {
            throw new Error('Logging service unavailable');
        });
        
        // Act & Assert
        expect(() => {
            ExternalLogger.logConversion(5, 'V');
        }).toThrow('Logging service unavailable');
    });

    // Test 5: Mock con diferentes respuestas en llamadas consecutivas
    test('should mock different responses for consecutive calls', () => {
        // Arrange
        ExternalLogger.logConversion
            .mockReturnValueOnce('first call')
            .mockReturnValueOnce('second call')
            .mockReturnValue('subsequent calls');
        
        // Act
        const result1 = ExternalLogger.logConversion(1, 'I');
        const result2 = ExternalLogger.logConversion(2, 'II');
        const result3 = ExternalLogger.logConversion(3, 'III');
        const result4 = ExternalLogger.logConversion(4, 'IV');
        
        // Assert
        expect(result1).toBe('first call');
        expect(result2).toBe('second call');
        expect(result3).toBe('subsequent calls');
        expect(result4).toBe('subsequent calls');
        expect(ExternalLogger.logConversion).toHaveBeenCalledTimes(4);
    });
});