module.exports = (req, res, next) => {
  const { email } = req.body;
  const HTTP_BAD_REQUEST = 400;  
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json(
      { message: 'O campo "email" é obrigatório' },
    );
  }

  if (!email.match(re)) {
    return res.status(HTTP_BAD_REQUEST).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    );
  }

  next();
};