const articlesRouter = require('express').Router();
const {
  sendArticleById,
  sendUpdateArticle
} = require('../controllers/articlesController');

articlesRouter
  .route('/:article_id')
  .get(sendArticleById)
  .patch(sendUpdateArticle);

module.exports = articlesRouter;
