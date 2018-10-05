const router = require('express').Router();
const {
  listAction,
  archiveAction,
  unarchiveAction,
  formAction,
  saveAction,
} = require('./controller');


router.get('/archive/:id', archiveAction);
router.get('/unarchive/:id', unarchiveAction);
router.get('/form/:id?', formAction);
router.post('/save', saveAction);
router.get('/:orderBy?', listAction);

module.exports = router;
