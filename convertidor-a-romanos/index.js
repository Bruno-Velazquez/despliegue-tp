const express = require('express');
const RomanConverter = require('./src/romanConverter');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoints
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

app.get('/api/convert/roman/:roman', (req, res) => {
    try {
        const { roman } = req.params;
        const result = RomanConverter.romanToInt(roman.toUpperCase());
        res.json({ roman, number: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/convert/number/:number', (req, res) => {
    try {
        const { number } = req.params;
        const num = parseInt(number);
        const result = RomanConverter.intToRoman(num);
        res.json({ number: num, roman: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Función para encontrar un puerto disponible
function findAvailablePort(startPort) {
    return new Promise((resolve, reject) => {
        const net = require('net');
        const server = net.createServer();
        
        server.listen(startPort, () => {
            server.close(() => {
                resolve(startPort);
            });
        });
        
        server.on('error', () => {
            resolve(findAvailablePort(startPort + 1));
        });
    });
}

// Iniciar servidor con puerto disponible
async function startServer() {
    try {
        const availablePort = await findAvailablePort(PORT);
        
        app.listen(availablePort, () => {
            console.log('🚀 Roman Converter Server started!');
            console.log(`📍 Local: http://localhost:${availablePort}`);
            console.log(`🌐 Network: http://${require('os').hostname()}:${availablePort}`);
            console.log('⚡ Press Ctrl+C to stop');
        });
        
    } catch (error) {
        console.error('❌ Failed to start server:', error);
    }
}

startServer();