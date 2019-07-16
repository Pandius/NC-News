const {fetchAlltopics} = require('../models/topicsModel');

exports.sendTopics = (req, res, send) => {
  fetchAlltopics().then(topics => {
    console.log(topics);
    res.status(200).send({topics});
  });
};
