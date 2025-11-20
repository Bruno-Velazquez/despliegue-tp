class ExternalLogger {
    static logConversion(input, output) {
        // Simulamos un servicio externo de logging
        console.log(`Conversion: ${input} -> ${output}`);
        return true;
    }

    static async saveToDatabase(conversionData) {
        // Simulamos una llamada a base de datos
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Saved to DB:', conversionData);
                resolve({ id: 123, ...conversionData });
            }, 100);
        });
    }
}

module.exports = ExternalLogger;