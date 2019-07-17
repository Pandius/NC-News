const {fetchArticleById, updateArticle} = require('../models/articlesModel');

exports.sendArticleById = (req, res, next) => {
  const {article_id} = req.params;
  fetchArticleById(article_id)
    .then(article => {
      res.status(200).send({article});
    })
    .catch(next);
};

exports.sendUpdateArticle = (req, res, next) => {
  const {article_id} = req.params;
  const {body} = req;
  updateArticle(article_id, body)
    .then(article => {
      res.status(200).send({article});
    })
    .catch(next);
};
