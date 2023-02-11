module.exports = (req, res, next) => {
  const { password } = req.body;
  const HTTP_BAD_REQUEST = 400;
  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json(
      { message: 'O campo "password" é obrigatório' },
    );
  }

  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
    );
  }

  next();
};