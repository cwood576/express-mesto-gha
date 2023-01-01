const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const uncorrectData = 400;
const invalidUserData = 401;
const notFound = 404;
const defaultErr = 500;

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(defaultErr).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    password,
    email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name,
      about,
      avatar,
      password: hash,
      email,
    })
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, 'some-secret-key');
        return res
          .cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
          })
          .send({ data: user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(uncorrectData).send({ message: 'Введены некорректные данные' });
        }
        return res.status(defaultErr).send({ message: 'Произошла ошибка' });
      }));
};

module.exports.getUser = (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        return res.status(notFound).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(uncorrectData).send({ message: 'Некорректный ID' });
      }
      return res.status(defaultErr).send({ message: 'Произошла ошибка' });
    });
};

module.exports.login = (req, res) => {
  const { password, email } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (user === null) {
        return res.status(invalidUserData).send({ message: 'Пользователь не найден' });
      }
      return { matched: bcrypt.compare(password, user.password), id: user._id };
    })
    .then(({ matched, id }) => {
      if (!matched) {
        return res.status(invalidUserData).send({ message: 'Пользователь не найден' });
      }
      return res.send({ _id: id });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(uncorrectData).send({ message: 'Некорректный ID' });
      }
      return res.status(defaultErr).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user === null) {
        return res.status(notFound).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(uncorrectData).send({ message: 'Некорректный ID' });
      }
      if (err.name === 'ValidationError') {
        return res.status(uncorrectData).send({ message: 'Введены некорректные данные' });
      }
      return res.status(defaultErr).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user === null) {
        return res.status(notFound).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(uncorrectData).send({ message: 'Некорректный ID' });
      }
      if (err.name === 'ValidationError') {
        return res.status(uncorrectData).send({ message: 'Введены некорректные данные' });
      }
      return res.status(defaultErr).send({ message: 'Произошла ошибка' });
    });
};
