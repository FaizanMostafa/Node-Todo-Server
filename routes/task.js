const router = require('express').Router();
const tasks = require('../views/task');

router.get('/get', tasks.get);
router.post('/add', tasks.add);
router.get('/all', tasks.all);
router.post('/update', tasks.update);
router.post('/delete', tasks.delete);

module.exports = router;