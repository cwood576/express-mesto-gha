const router = require('express').Router();
const {
  getCards,
  postCard,
  deleteCard,
  deleteLike,
  likeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', postCard);
router.delete('/cards/:cardId/likes', deleteLike);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:id', deleteCard);


module.exports = router;
