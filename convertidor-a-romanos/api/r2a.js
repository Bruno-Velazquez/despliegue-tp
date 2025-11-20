import RomanConverter from '../../src/romanConverter.js';

export default function handler(req, res) {
    // Habilitar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');

    const roman = req.query.roman;

    if (!roman) {
        return res.status(400).json({ error: 'Missing roman parameter' });
    }

    try {
        const arabic = RomanConverter.romanToInt(roman.toUpperCase());
        return res.status(200).json({ arabic });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
