exports.routeNotFound = (req, res) => {
  res.status(404).send({msg: 'Page not found'});
};

exports.handleSQLErrors = (err, req, res, next) => {
  const errCodes = {
    '22P02': 'Invalid article id',
    '23502': 'No data to post!'
  };
  if (errCodes[err.code]) {
    res.status(400).send({msg: errCodes[err.code]});
  } else next(err);
};
exports.MethodNotAllowed = (req, res, next) => {
  res.status(405).send({msg: 'Method not allowed'});
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({msg: err.msg || 'Something went wrong'});
  } else next(err);
};

exports.handleNotFoundSqlErrors = (err, req, res, next) => {
  const sqlErrorCodes = {
    '23503': 'Not found'
  };
  if (sqlErrorCodes[err.code]) {
    res.status(404).send({msg: sqlErrorCodes[err.code]});
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({msg: 'Internal Server Error'});
};
