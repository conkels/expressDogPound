console.log('Hello, World!');

const express = require('express');
const parser = require('body-parser');

const app = express();

app.use(parser.json());

const cows = require('./cows');
const dogRoutes = require('./routes/dogRoutes');

app.use((req, res, next) => {
  console.log(req.method, req.url, new Date());
  return next();
});

app.get('/', (request, response) => {
  response.send(cows.speak('Mooooooo'));
});

app.use('/dog', dogRoutes);

app.use('*', (req, res, next) => next({ status: 404, message: 'Invalid URL' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status).send(err.message);
});

const server = app.listen(4494, () => {
  console.log('Server successfully started on port', server.address().port);
});

module.exports = server;
