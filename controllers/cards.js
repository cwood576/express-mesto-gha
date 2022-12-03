const Cards = require('../models/cards');

const uncorrectData = 400;
const notFound = 404;
const defaultErr = 500;

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(defaultErr).send({ message: 'Произошла ошибка' }));
};
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (card === null) {
        return res.status(notFound).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      // Добавляем два варианта имени иначе почти всегда будет использоваться стандартная ошибка
      if (err.name === 'ValidatorError' || err.name === 'ValidationError') {
        return res.status(uncorrectData).send({ message: 'Введены некорректные данные' });
      }
      return res.status(defaultErr).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null) {
        return res.status(notFound).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(uncorrectData).send({ message: 'Некорректный ID' });
      }
      return res.status(defaultErr).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteLike = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res.status(notFound).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(uncorrectData).send({ message: 'Некорректный ID' });
      }
      return res.status(defaultErr).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return res.status(notFound).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(uncorrectData).send({ message: 'Некорректный ID' });
      }
      return res.status(defaultErr).send({ message: 'Произошла ошибка' });
    });
};
