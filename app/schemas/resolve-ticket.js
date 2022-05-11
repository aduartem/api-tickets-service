const joi = require('joi');

module.exports.resolveTicket = joi.object({
  status_id: joi.number().required(),
});
