const _ = require('lodash');

const logger = require('../config/winston');
const { Ticket } = require('../models');
const models = require('../models');

class TicketRepository {
  constructor() {
    this.className = _.camelCase(this.constructor.name);
  }

  async createTicket(ticket) {
    const method = 'createTicket';
    logger.info(`[${this.className}][${method}] init`);
    ticket.status_id = 1;
    ticket.assignment_date = new Date();
    const result = await Ticket.create(ticket);
    logger.info(`[${this.className}][${method}] success`);
    return result;
  }

  async getTickets() {
    const method = 'getTickets';
    logger.info(`[${this.className}][${method}] init`);
    const tickets = await Ticket.findAll({
      include: 'Status',
    });
    return tickets;
  }

  async getTicketById(ticketId) {
    const method = 'getTicketById';
    logger.info(`[${this.className}][${method}] init`);
    const ticket = await Ticket.findOne({
      include: 'Status',
      where: {
        id: ticketId,
      },
    });
    return ticket;
  }

  async updateTicketById(ticketId, dataToSet) {
    const method = 'updateTicketById';
    logger.info(`[${this.className}][${method}] init`);
    const conditions = {
      where: {
        id: ticketId,
      },
    };
    await Ticket.update(dataToSet, conditions);
    logger.info(`[${this.className}][${method}] success`);
    return true;
  }

  async deleteTicketById(ticketId) {
    const method = 'deleteTicketById';
    logger.info(`[${this.className}][${method}] init`);
    const result = await Ticket.destroy({
      where: {
        id: ticketId,
      },
    });
    return result;
  }

  async getTicketByAssignedUser(assignedUser) {
    const method = 'getTicketByAssignedUser';
    logger.info(`[${this.className}][${method}] init`);
    const tickets = await Ticket.findAll({
      include: 'Status',
      where: {
        assigned_user: assignedUser,
      },
    });
    return tickets;
  }

  async resolveTicket(ticketId, dataToSet) {
    const method = 'resolveTicket';
    logger.info(`[${this.className}][${method}] init`);
    const conditions = {
      where: {
        id: ticketId,
      },
    };
    dataToSet.resolution_date = new Date();
    await Ticket.update(dataToSet, conditions);
    logger.info(`[${this.className}][${method}] success`);
    return true;
  }

  async getTicketReport() {
    const method = 'getTicketReport';
    logger.info(`[${this.className}][${method}] init`);
    const sql = `
      select
        a.assigned_user as assigned_user,
        ifnull(total_to_solve, 0) as total_to_solve,
        ifnull(total_resolved, 0) as total_resolved,
        ifnull(total_rejected, 0) as total_rejected,
        ifnull(total_canceled, 0) as total_canceled
      from
      (
        select
          count(*) as total_devs,
          assigned_user
        from tickets
        where assigned_user is not null
        group by assigned_user
      ) as a
      left join
      (
        select
          count(*) as total_to_solve,
          assigned_user
        from tickets
        where status_id = 1
        group by assigned_user
      ) as b
      on a.assigned_user = b.assigned_user
      left join
      (
        select
          count(*) as total_resolved,
          assigned_user
        from tickets
        where status_id = 2
        group by assigned_user
      ) as c
      on b.assigned_user = c.assigned_user
      left join
      (
        select
          count(*) as total_rejected,
          assigned_user
        from tickets
        where status_id = 3
        group by assigned_user
      ) as d
      on c.assigned_user = d.assigned_user
      left join
      (
        select
          count(*) as total_canceled,
          assigned_user
        from tickets
        where status_id = 4
        group by assigned_user
      ) as e
      on d.assigned_user = e.assigned_user
    `;
    const result = await models.sequelize.query(sql, {
      type: models.sequelize.QueryTypes.SELECT,
    });
    return result;
  }
}

module.exports = new TicketRepository();
