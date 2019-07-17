const topicsRouter = require('express').Router();
const {sendTopics} = require('../controllers/topicsController');
const {MethodNotAllowed} = require('../errors/index');

topicsRouter
  .route('/')
  .get(sendTopics)
  .all(MethodNotAllowed);

module.exports = topicsRouter;
