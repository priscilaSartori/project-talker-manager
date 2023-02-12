module.exports = (req, res, next) => {
  const { talk } = req.body;
  const HTTP_BAD_REQUEST = 400;
 
  if (!talk) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "talk" é obrigatório' });
  } 
  next();
};