exports.formatDate = list => {
  return list.map(Element => {
    const newObj = {...Element};
    const date = new Date(Element.created_at).toLocaleString();
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
