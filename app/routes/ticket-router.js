const router = require('express').Router();

const ticketController = require('../controllers/ticket-controller');
const validateTicketMiddleware = require('../middleware/validate-ticket');
const validateResolveTicketMiddleware = require('../middleware/validate-resolve-ticket');

router.post('/tickets', [validateTicketMiddleware.validateTicket], ticketController.createTicket.bind(ticketController));

router.get('/tickets', ticketController.getTickets.bind(ticketController));
router.get('/tickets/:id', ticketController.getTicketById.bind(ticketController));
router.get('/report/tickets', ticketController.getTicketReport.bind(ticketController));

router.put('/tickets/:id', [validateTicketMiddleware.validateTicket], ticketController.updateTicketById.bind(ticketController));

router.delete('/tickets/:id', ticketController.deleteTicketById.bind(ticketController));

router.get('/user/:username/tickets', ticketController.getTicketByAssignedUser.bind(ticketController));

router.put('/tickets/:id/resolve', [validateResolveTicketMiddleware.validateResolveTicket], ticketController.resolveTicket.bind(ticketController));

module.exports = router;
