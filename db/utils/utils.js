exports.formatDate = list => {
  return list.map(element => {
    const newObj = {...element};

    const date = new Date(element.created_at);
    newObj.created_at = date;
    return newObj;
  });
};

exports.makeRefObj = list => {
  const refObj = {};
  list.forEach(article => {
    refObj[article.title] = article.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    const author = comment.created_by;
    comment.created_at = new Date(comment.created_at);
    const {belongs_to, created_by, ...restOfComments} = comment;
    const article_id = articleRef[belongs_to];
    return {article_id, author, ...restOfComments};
  });
};
