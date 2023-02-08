const express = require('express');
const { talkerReadFile } = require('./talkerfs');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const speakers = await talkerReadFile();
  if (!speakers) {
    res.status(HTTP_OK_STATUS).send([]);
  } res.status(HTTP_OK_STATUS).send(speakers);
});

app.get('/talker/:id', async (req, res) => {
  const speakers = await talkerReadFile();
  const speaker = speakers.find(({id}) => id === Number(req.params.id))
  if (!speaker) {
    res.status(HTTP_NOTFOUND_STATUS).send({"message": "Pessoa palestrante não encontrada"});
  } res.status(HTTP_OK_STATUS).send(speaker);
});

app.listen(PORT, () => {
  console.log('Online');
});
