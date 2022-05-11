const _ = require('lodash');

const logger = require('../config/winston');
const { Status } = require('../models');

class StatusRepository {
  constructor() {
    this.className = _.camelCase(this.constructor.name);
  }

  async getStatuses() {
    const method = 'getStatuses';
    logger.info(`[${this.className}][${method}] init`);
    const statuses = await Status.findAll();
    return statuses;
  }
}

module.exports = new StatusRepository();
