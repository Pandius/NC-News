const {
  postComment,
  fetchComments,
  updateComment,
  deleteComment
} = require('../models/commentsModel');

exports.sendPostComment = (req, res, next) => {
  const {article_id} = req.params;
  const {body} = req;
  postComment(article_id, body)
    .then(comment => {
      res.status(201).send({comment});
    })
    .catch(next);
};

exports.sendAllComments = (req, res, next) => {
  const {article_id} = req.params;
  const {sort_by, order, ...restOfTheQuery} = req.query;
  const validOrder = ['asc', 'desc'].includes(order);
  const isInteger = /\d+/;

  if (isInteger.test(article_id) === false) {
    return next({
      status: 400,
      msg: 'Bad request - Article ID must be an integer'
    });
  }
  if (order && !validOrder) {
    return next({
      status: 400,
      msg: 'Bad request - invalid order value'
    });
  }

  fetchComments(article_id, sort_by, order)
    .then(comments => {
      if (comments.hasOwnProperty('body')) {
        comments = [];
        res.status(200).send({comments});
      } else res.status(200).send({comments});
    })
    .catch(next);
};

exports.sendCommentsUpdate = (req, res, next) => {
  const {comment_id} = req.params;
  const {inc_votes} = req.body;
  updateComment(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({comment});
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  const comment_id = req.params.comment_id;
  deleteComment(comment_id)
    .then(comment => {
      res.status(204).send('deleted');
    })
    .catch(next);
};
