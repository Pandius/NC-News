const usersRouter = require('express').Router();
const {sendUserByUsername} = require('../controllers/usersController');
const {MethodNotAllowed} = require('../errors/index');

usersRouter
  .route('/:username')
  .get(sendUserByUsername)
  .all(MethodNotAllowed);

module.exports = usersRouter;
