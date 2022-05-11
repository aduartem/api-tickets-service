const _ = require('lodash');

const logger = require('../config/winston');
const ticketRepository = require('../repositories/ticket-repository');

class TicketController {
  constructor() {
    this.className = _.camelCase(this.constructor.name);
  }

  async createTicket(req, res) {
    const method = 'createTicket';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const ticket = await ticketRepository.createTicket(req.body);
      logger.info(`[${this.className}][${method}] success`);
      return res.status(201).json({
        ticket,
      });
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.status(500).json({
        message: 'Hubo un error al intentar crear el ticket.',
      });
    }
  }

  async getTickets(req, res) {
    const method = 'getTickets';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const tickets = await ticketRepository.getTickets();
      logger.info(`[${this.className}][${method}] success`);
      return res.json({
        tickets,
      });
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.status(500).json({
        message: 'Hubo un error al intentar obtener los tickets.',
      });
    }
  }

  async getTicketById(req, res) {
    const method = 'getTicketById';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { id } = req.params;
      const ticket = await ticketRepository.getTicketById(id);
      logger.info(`[${this.className}][${method}] success`);
      return res.json({
        ticket,
      });
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.status(500).json({
        message: 'Hubo un error al intentar obtener los tickets.',
      });
    }
  }

  async updateTicketById(req, res) {
    const method = 'updateTicketById';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { id } = req.params;
      await ticketRepository.updateTicketById(id, req.body);
      logger.info(`[${this.className}][${method}] success`);
      return res.status(200).json({
        message: 'Ticket actualizado exitosamente.',
      });
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.status(500).json({
        message: 'Hubo un error al intentar actualizar el ticket.',
      });
    }
  }

  async deleteTicketById(req, res) {
    const method = 'deleteTicketById';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { id } = req.params;
      const result = await ticketRepository.deleteTicketById(id);
      if (result !== 1) {
        return res.status(500).json({
          message: 'Hubo un error al eliminar el ticket.',
        });
      }
      logger.info(`[${this.className}][${method}] success`);
      return res.json({
        message: 'Ticket eliminado exitosamente.',
      });
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.status(500).json({
        message: 'Hubo un error al intentar eliminar el ticket.',
      });
    }
  }

  async getTicketByAssignedUser(req, res) {
    const method = 'getTicketByAssignedUser';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { username: assignedUser } = req.params;
      const tickets = await ticketRepository.getTicketByAssignedUser(assignedUser);
      logger.info(`[${this.className}][${method}] success`);
      return res.json({
        tickets,
      });
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.status(500).json({
        message: 'Hubo un error al intentar obtener los tickets.',
      });
    }
  }

  async resolveTicket(req, res) {
    const method = 'resolveTicket';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { id } = req.params;
      logger.info(`[${this.className}][${method}] Ticket ID: ${id}`);
      logger.info(`[${this.className}][${method}] req.body: ${JSON.stringify(req.body)}`);
      await ticketRepository.resolveTicket(id, req.body);
      logger.info(`[${this.className}][${method}] success`);
      return res.status(200).json({
        message: 'Ticket resuelto exitosamente.',
      });
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.status(500).json({
        message: 'Hubo un error al intentar resolver el ticket.',
      });
    }
  }

  async getTicketReport(req, res) {
    const method = 'getTicketReport';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const data = await ticketRepository.getTicketReport();
      logger.info(`[${this.className}][${method}] success`);
      return res.json({
        data,
      });
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.status(500).json({
        message: 'Hubo un error al intentar obtener el reporte.',
      });
    }
  }
}

module.exports = new TicketController();
