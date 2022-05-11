const router = require('express').Router();

const statusController = require('../controllers/status-controller');

router.get('/tickets/statuses', statusController.getStatuses.bind(statusController));

module.exports = router;
