const router = require('express').Router();
const {
    listAction,
    archiveAction,
    unarchiveAction,
    formAction,
    saveAction
} = require('./controller');

router.get('/:orderBy?', listAction);
router.get('/archive/:id', archiveAction);
router.get('/unarchive/:id', unarchiveAction);
router.get('/form/:id?', formAction);
router.post('/save', saveAction);

module.exports = router;