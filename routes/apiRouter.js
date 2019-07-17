const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const usersRouter = require('./usersRouter');
const articlesRouter = require('./articlesRouter');
const {MethodNotAllowed} = require('../errors/index.js');

apiRouter
  .route('/')
  //   .get((req, res) => res.status(200).send(endpoints))
  .all(MethodNotAllowed);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;
