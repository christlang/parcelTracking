const router = require('express').Router();
const { listAction, archiveAction } = require('./controller');

router.get('/', listAction);
router.get('/archive/:id', archiveAction);

module.exports = router;