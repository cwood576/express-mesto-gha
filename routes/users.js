const router = require('express').Router();
const {
  getUsers,
  postUser,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users/:id', getUser);
router.get('/users', getUsers);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

router.post('/users', postUser);

module.exports = router;
