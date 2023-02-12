module.exports = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const HTTP_BAD_REQUEST = 400;
  const watch = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

  if (!watchedAt) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!watchedAt.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
    return res.status(HTTP_BAD_REQUEST).json({ message: watch });
  }
  next();
};