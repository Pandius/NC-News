exports.formatDate = list => {
  return list.map(Element => {
    const newObj = {...Element};
    const date = new Date(Element.created_at).toLocaleString();
    newObj.created_at = date;
    return newObj;
  });
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
