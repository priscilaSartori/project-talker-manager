const express = require('express');
const randtoken = require('rand-token');
const fs = require('fs/promises');
const { talkerReadFile, talkerFilePath } = require('./talkerfs');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const auth = require('./middlewares/auth');
const validateAge = require('./middlewares/validateAge');
const validateName = require('./middlewares/validateName');
const validateTalk = require('./middlewares/validateTalk');
const validateRate = require('./middlewares/validateRate');
const validateWatchedAt = require('./middlewares/validateWatchedAt');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const HTTP_CREATED = 201;
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
  const speaker = speakers.find(({ id }) => id === Number(req.params.id));
  if (!speaker) {
    res.status(HTTP_NOTFOUND_STATUS).send({ message: 'Pessoa palestrante não encontrada' });
  } res.status(HTTP_OK_STATUS).send(speaker);
});

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const token = randtoken.generate(16);
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', auth, validateAge, validateName, validateTalk, validateWatchedAt, validateRate, 
async (req, res) => {
  const { name, age, talk } = req.body;
  const speakers = await talkerReadFile();
  const newSpeaker = {
    id: speakers[speakers.length - 1].id + 1,
    name,
    age,
    talk,
  };
  const allSpeakers = JSON.stringify([...speakers, newSpeaker]);
  await fs.writeFile(talkerFilePath, allSpeakers);
  res.status(HTTP_CREATED).json(newSpeaker);
});

app.put('/talker/:id', 
auth, validateAge, validateName, validateTalk, validateWatchedAt, validateRate, 
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const speakers = await talkerReadFile();
  const index = speakers.findIndex((element) => element.id === Number(id));
  speakers[index] = { id: Number(id), name, age, talk };
  const updatedSpeaker = JSON.stringify(speakers, null, 2);
    await fs.writeFile(talkerFilePath, updatedSpeaker);
    res.status(HTTP_OK_STATUS).json(speakers[index]);
});

app.listen(PORT, () => {
  console.log('Online');
});
