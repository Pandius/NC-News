const commentsRouter = require('express').Router();

const {sendCommentsUpdate} = require('../controllers/commentsController');
const {MethodNotAllowed} = require('../errors/index');

commentsRouter
  .route('/:comment_id')
  .patch(sendCommentsUpdate)
  .all(MethodNotAllowed);

module.exports = commentsRouter;
