const express = require('express');
const { toRoman, fromRoman } = require('./index');
const app = express();

app.use(express.json());

app.get('/to-roman/:num', (req, res) => {
  const num = parseInt(req.params.num, 10);
  res.send({ result: toRoman(num) });
});

app.get('/from-roman/:roman', (req, res) => {
  const roman = req.params.roman;
  res.send({ result: fromRoman(roman) });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
