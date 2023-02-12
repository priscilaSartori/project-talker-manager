module.exports = (req, res, next) => {
  const { age } = req.body;
  const HTTP_BAD_REQUEST = 400;
  const typeofAge = 'O campo "age" deve ser do tipo "number"';
  const NumberInteiroAge = 'O campo "age" deve ser um "number" do tipo inteiro';
  const MaiorIdadeAge = 'A pessoa palestrante deve ser maior de idade';
  if (!age) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number') {
    return res.status(HTTP_BAD_REQUEST).json({ message: typeofAge }); 
  }
  if (!Number.isInteger(age)) {
    return res.status(HTTP_BAD_REQUEST).json({ message: NumberInteiroAge }); 
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST).json({ message: MaiorIdadeAge });
  }
  next();
};