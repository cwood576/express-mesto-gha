const Users = require('../models/users');

const uncorrectData = 400;
const notFound = 404;
const defaultErr = 500;

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(defaultErr).send({ message: 'Произошла ошибка' }));
};

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        return res.status(uncorrectData).send({ message: 'Введены некорректные данные' });
      }
      if (err.name === 'ValidationError') {
        return res.status(uncorrectData).send({ message: 'Введены некорректные данные' });
      }
      return res.status(defaultErr).send({ message: 'Произошла ошибка' });
    });
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
      if (err.name === 'ValidatorError') {
        return res.status(uncorrectData).send({ message: 'Введены некорректные данные' });
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
      if (err.name === 'ValidatorError') {
        return res.status(uncorrectData).send({ message: 'Введены некорректные данные' });
      }
      if (err.name === 'ValidationError') {
        return res.status(uncorrectData).send({ message: 'Введены некорректные данные' });
      }
      return res.status(defaultErr).send({ message: 'Произошла ошибка' });
    });
};
