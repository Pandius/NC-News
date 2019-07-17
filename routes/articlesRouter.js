const articlesRouter = require('express').Router();
const {
  sendArticleById,
  sendUpdateArticle
} = require('../controllers/articlesController');

const {sendPostComment} = require('../controllers/commentsController');

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(sendUpdateArticle);
articlesRouter.route('/:article_id/comments').post(sendPostComment);

module.exports = articlesRouter;
