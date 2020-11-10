const express = require('express');
const passport = require('passport');
const controller = require('../controllers/book');
const router = express.Router();

router.get('/:authorId', passport.authenticate('jwt', {session: false}), controller.getByAuthorId);
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);


module.exports = router;