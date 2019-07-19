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
        return comment[0];
      }
    });
};

exports.fetchComments = (article_id, sort_by, order) => {
  return connection
    .select('*')
    .from('comments')
    .where('article_id', article_id)
    .orderBy(sort_by || 'created_at', order || 'desc')
    .then(comments => {
      if (!comments || !comments.length) {
        return Promise.reject({status: 404, msg: 'comments not found'});
      } else {
        return comments;
      }
    });
};

exports.updateComment = (id, votes) => {
  if (isNaN(votes)) {
    return Promise.reject({
      status: 400,
      msg: 'Bad request - votes needs to be a number'
    });
  } else {
    return connection
      .first('*')
      .where('comment_id', id)
      .increment('votes', votes)
      .returning('*')
      .from('comments')
      .then(([comment]) => {
        if (!comment) {
          return Promise.reject({
            status: 404,
            msg: 'comment Id not found'
          });
        } else return comment;
      });
  }
};

exports.deleteComment = id => {
  return connection
    .select('*')
    .from('comments')
    .where('comments.comment_id', id)
    .delete()
    .then(deleted => {
      if (!deleted) {
        return Promise.reject({
          status: 404,
          msg: `Comment with Id ${id} not found`
        });
      } else {
        return 'Deleted';
      }
    });
};
