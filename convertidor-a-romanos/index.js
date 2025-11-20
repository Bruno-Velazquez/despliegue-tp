const express = require('express');
const RomanConverter = require('./src/romanConverter');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;


// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* NUEVAS RUTAS PARA EL VALIDADOR EXTERNO */

// GET /r2a  (Romanos → Arábigos)
app.get('/r2a', (req, res) => {
    try {
        const { value } = req.query;

        if (!value) {
            return res.status(400).json({ error: 'Missing value parameter' });
        }

        const result = RomanConverter.romanToInt(value.toUpperCase());
        return res.json({ input: value, result, type: 'roman to number' });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// GET /a2r  (Arábigos → Romanos)
app.get('/a2r', (req, res) => {
    try {
        const { value } = req.query;

        if (!value) {
            return res.status(400).json({ error: 'Missing value parameter' });
        }

        const number = parseInt(value);

        const result = RomanConverter.intToRoman(number);
        return res.json({ input: number, result, type: 'number to roman' });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

/*  API PRINCIPAL*/

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

// Ruta de salud
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Roman Converter API is running',
        timestamp: new Date().toISOString()
    });
});

// Manejar rutas no definidas (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Solo iniciar servidor local si no es Vercel
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
