// /api/a2r.js
import RomanConverter from '../../src/romanConverter.js';

export default function handler(req, res) {
    const { value } = req.query;

    if (!value) {
        return res.status(400).json({ error: 'Missing value parameter' });
    }

    try {
        const number = parseInt(value);
        const result = RomanConverter.intToRoman(number);
        return res.status(200).json({ input: number, result, type: 'number to roman' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
