const articlesRouter = require('express').Router();
const {
  sendArticleById,
  sendUpdateArticle
} = require('../controllers/articlesController');
const {MethodNotAllowed} = require('../errors/index');

const {sendPostComment} = require('../controllers/commentsController');

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(sendUpdateArticle)
  .all(MethodNotAllowed);
articlesRouter
  .route('/:article_id/comments')
  .post(sendPostComment)
  .all(MethodNotAllowed);

module.exports = articlesRouter;
