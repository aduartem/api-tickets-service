const joi = require('joi');

module.exports.ticket = joi.object({
  subject: joi.string().required(),
  description: joi.string().required(),
  creator_user: joi.string().required(),
  assigned_user: joi.string().required(),
});
