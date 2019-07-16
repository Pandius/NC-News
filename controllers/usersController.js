const {fetchUserByUsername} = require('../models/usersModel');

exports.sendUserByUsername = (req, res, next) => {
  const {username} = req.params;
  fetchUserByUsername(username)
    .then(user => {
      if (!user) {
        return Promise.reject({status: 404, msg: 'user doesn`t exists'});
      } else {
        res.status(200).send({user});
      }
    })
    .catch(next);
};
