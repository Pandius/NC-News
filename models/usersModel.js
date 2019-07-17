const connection = require('../db/connection');

exports.fetchUserByUsername = username => {
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
};
