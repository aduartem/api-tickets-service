const _ = require('lodash');

const logger = require('../config/winston');
const statusRepository = require('../repositories/status-repository');

class StatusController {
  constructor() {
    this.className = _.camelCase(this.constructor.name);
  }

  async getStatuses(req, res) {
    const method = 'getStatuses';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const statuses = await statusRepository.getStatuses();
      logger.info(`[${this.className}][${method}] success`);
      return res.json({
        statuses,
      });
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.status(500).json({
        message: 'Hubo un error al intentar obtener los estados.',
      });
    }
  }
}

module.exports = new StatusController();
