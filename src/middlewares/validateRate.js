module.exports = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  const HTTP_BAD_REQUEST = 400;
  const numberRate = 'O campo "rate" deve ser um inteiro de 1 à 5';

  if (rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST).json({ message: numberRate });
  }
  if (!rate) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "rate" é obrigatório' });
  } 
  if (!Number.isInteger(rate)) {
    return res.status(HTTP_BAD_REQUEST).json({ message: numberRate });
  }
  next();
};