import RomanConverter from '../../src/romanConverter.js';

export default function handler(req, res) {
    // Habilitar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');

    const arabic = req.query.arabic;

    if (!arabic || isNaN(arabic)) {
        return res.status(400).json({ error: 'Missing or invalid arabic parameter' });
    }

    try {
        const number = parseInt(arabic);
        const roman = RomanConverter.intToRoman(number);
        return res.status(200).json({ roman });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
