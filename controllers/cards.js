const Cards = require('../models/cards');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err._message === 'cards validation failed') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Запись не найдена' });
      }
      if (err.name === 'ValidatorError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      if (err.errors.about.name === 'ValidatorError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteLike = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Запись не найдена' });
      }
      if (err.name === 'ValidatorError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      if (err.errors.about.name === 'ValidatorError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Запись не найдена' });
      }
      if (err.name === 'ValidatorError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      if (err.errors.about.name === 'ValidatorError') {
        return res.status(400).send({ message: 'Введены некорректные данные' });
      }
      return res.status(500).send({ message: err.message });
    });
};
