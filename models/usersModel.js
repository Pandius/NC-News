const connection = require('../db/connection');

exports.fetchUserByUsername = username => {
  if (/^[a-z]+$/i.test(username)) {
    return connection
      .first('*')
      .from('users')
      .where('username', '=', username)
      .then(user => {
        if (!user) {
          return Promise.reject({status: 404, msg: 'user doesnt exists'});
        } else {
          return user;
        }
      });
  } else {
    return Promise.reject({status: 400, msg: 'Bad request'});
  }
};
