const commentsRouter = require('express').Router();

const {
  sendCommentsUpdate,
  removeComment
} = require('../controllers/commentsController');
const {MethodNotAllowed} = require('../errors/index');

commentsRouter
  .route('/:comment_id')
  .patch(sendCommentsUpdate)
  .delete(removeComment)
  .all(MethodNotAllowed);

module.exports = commentsRouter;
