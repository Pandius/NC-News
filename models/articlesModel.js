const connection = require('../db/connection.js');

exports.fetchArticleById = article_id => {
  return connection
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .first('articles.*')
    .groupBy('articles.article_id', 'comments.article_id')
    .count('comments.article_id AS comment_count')
    .from('articles')
    .where('articles.article_id', article_id)
    .then(article => {
      if (!article) {
        return Promise.reject({status: 404, msg: 'article not found'});
      } else {
        return article;
      }
    });
};

exports.updateArticle = (article_id, points) => {
  return connection
    .increment('votes', points.inc_votes || 0)
    .into('articles')
    .where('article_id', '=', article_id)
    .returning('*')
    .then(article => {
      if (!article || !article.length) {
        return Promise.reject({status: 404, msg: 'article not found'});
      } else {
        return article[0];
      }
    });
};

exports.fetchAllArticles = (
  sort_by = 'created_at',
  order = 'desc',
  author,
  topic
) => {
  return connection
    .select('articles.*')
    .count('comments.comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
    .modify(function(queryBuilder) {
      if (author && topic) {
        queryBuilder.where('articles.author', author);
      } else if (author) {
        queryBuilder.where('articles.author', author);
      } else if (topic) {
        queryBuilder.where('articles.topic', topic);
      }
    })
    .then(article => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: 'Article not found'
        });
      } else return article;
    });
};

exports.checkExists = (queryValue, table, column) => {
  return connection
    .select('*')
    .from(table)
    .where(column, queryValue)
    .then(row => {
      if (row.length === 0) return false;
      else return true;
    });
};
