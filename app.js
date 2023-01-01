const express = require('express');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

const {
  login,
  createUser,
} = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '63831da353a6d888fc33c092',
//   };
//   next();
// });
app.use(require('./middlewares/auth'));

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
