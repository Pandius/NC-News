const {
  fetchArticleById,
  updateArticle,
  fetchAllArticles,
  checkExists
} = require('../models/articlesModel');

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

exports.sendAllArticles = (req, res, next) => {
  const {sort_by, order, author, topic} = req.query;
  const correctOrder = ['asc', 'desc'].includes(order);
  const correctSort_by = [
    'article_id',
    'title',
    'body',
    'votes',
    'topic',
    'author',
    'created_at'
  ].includes(sort_by);
  if (order && !correctOrder) {
    next({status: 400, msg: 'invalid order value'});
  }
  if (sort_by && !correctSort_by) {
    next({status: 400, msg: 'invalid sort by value'});
  } else {
    fetchAllArticles(sort_by, order, author, topic)
      .then(articles => {
        const authorExist = author
          ? checkExists(author, 'users', 'username')
          : null;
        const topicExist = topic ? checkExists(topic, 'topics', 'slug') : null;
        return Promise.all([authorExist, topicExist, articles]);
      })
      .then(([authorExist, topicExist, articles]) => {
        if (authorExist === false) {
          return Promise.reject({status: 404, msg: 'Author not found'});
        } else if (topicExist === false) {
          return Promise.reject({status: 404, msg: 'Topic not found'});
        } else {
          res.status(200).send({articles});
        }
      })
      .catch(next);
  }
};
