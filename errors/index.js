exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({msg: err.msg || 'Something went wrong'});
  } else next(err);
};
