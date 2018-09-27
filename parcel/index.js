const router = require('express').Router();
const { listAction, archiveAction, unarchiveAction } = require('./controller');

router.get('/', listAction);
router.get('/archive/:id', archiveAction);
router.get('/unarchive/:id', unarchiveAction);

module.exports = router;