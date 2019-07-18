const connection = require('../db/connection');

exports.postComment = (article_id, newComment) => {
  return connection
    .insert({
      body: newComment.body,
      article_id: article_id,
      author: newComment.username,
      votes: 0
    })
    .into('comments')
    .returning('*')
    .then(comment => {
      if (!comment || !comment.length) {
        return Promise.reject({status: 404, msg: 'comment not found'});
      } else {
        return comment;
      }
    });
};

exports.fetchComments = (article_id, sort_by) => {
  return connection
    .select('*')
    .from('comments')
    .where('article_id', article_id)
    .orderBy(sort_by || 'created_at', 'desc')
    .then(comments => {
      if (!comments || !comments.length) {
        return Promise.reject({status: 404, msg: 'comments not found'});
      } else {
        return comments;
      }
    });
};
