const articlesRouter = require('express').Router();
const {
  sendArticleById,
  sendUpdateArticle,
  sendAllArticles
} = require('../controllers/articlesController');
const {MethodNotAllowed} = require('../errors/index');

const {
  sendPostComment,
  sendAllComments
} = require('../controllers/commentsController');

articlesRouter
  .route('/')
  .get(sendAllArticles)
  .all(MethodNotAllowed);
articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(sendUpdateArticle)
  .all(MethodNotAllowed);
articlesRouter
  .route('/:article_id/comments')
  .post(sendPostComment)
  .get(sendAllComments)
  .all(MethodNotAllowed);

module.exports = articlesRouter;
