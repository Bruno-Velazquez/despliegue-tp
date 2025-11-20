import RomanConverter from '../../src/romanConverter.js';

export default function handler(req, res) {
    // Habilitar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');

    const arabic = req.query.arabic;

    // Validación
    if (!arabic) {
        return res.status(400).json({ error: 'Missing arabic parameter' });
    }

    const number = parseInt(arabic);
    if (isNaN(number) || number < 1 || number > 3999) {
        return res.status(400).json({ error: 'arabic parameter must be a number between 1 and 3999' });
    }

    try {
        const roman = RomanConverter.intToRoman(number);
        return res.status(200).json({ roman });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
