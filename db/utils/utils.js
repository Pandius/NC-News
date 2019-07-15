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

exports.formatComments = (comments, articleRef) => {};
