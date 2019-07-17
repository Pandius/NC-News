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
    .returning('*');
};
