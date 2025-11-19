const express = require('express');
const RomanConverter = require('./src/romanConverter');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal - servir el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoints (mantén los que ya tienes)
app.get('/api/convert', (req, res) => {
    try {
        const { input } = req.query;
        
        if (!input) {
            return res.status(400).json({ error: 'Input parameter is required' });
        }

        if (!isNaN(input)) {
            const number = parseInt(input);
            const result = RomanConverter.intToRoman(number);
            return res.json({ input: number, result, type: 'number to roman' });
        } else {
            const result = RomanConverter.romanToInt(input.toUpperCase());
            return res.json({ input, result, type: 'roman to number' });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

app.post('/api/convert', (req, res) => {
    try {
        const { input } = req.body;
        
        if (!input) {
            return res.status(400).json({ error: 'Input is required' });
        }

        if (!isNaN(input)) {
            const number = parseInt(input);
            const result = RomanConverter.intToRoman(number);
            return res.json({ input: number, result, type: 'number to roman' });
        } else {
            const result = RomanConverter.romanToInt(input.toUpperCase());
            return res.json({ input, result, type: 'roman to number' });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Ruta de salud para verificar que el servidor funciona
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Roman Converter API is running',
        timestamp: new Date().toISOString()
    });
});

// Manejar todas las demás rutas para SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Solo iniciar el servidor si no estamos en Vercel
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export para Vercel
module.exports = app;