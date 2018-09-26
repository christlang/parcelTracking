const router = require('express').Router();
const { listAction } = require('./controller');

router.get('/', listAction);

module.exports = router;