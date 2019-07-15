const {topicsData, articlesData, commentsData, usersData} = require('../data');

const {formatDate, formatComments, makeRefObj} = require('../utils/utils');

exports.seed = function(connection) {
  return connection.migrate
    .rollback()
    .then(() => {
      return connection.migrate.latest();
    })
    .then(() => {
      const topicsInsertions = connection('topics')
        .insert(topicsData)
        .returning('*');
      const usersInsertions = connection('users')
        .insert(usersData)
        .returning('*');
      return Promise.all([topicsInsertions, usersInsertions]).then(() => {
        const formatedArticleDateData = formatDate(articlesData);
        return connection('articles')
          .insert(formatedArticleDateData)
          .returning('*');
      });
    })
    .then(articleRows => {
      const articlesRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentsData, articlesRef);
      return connection('comments')
        .insert(formattedComments)
        .returning('*');
    });
};
