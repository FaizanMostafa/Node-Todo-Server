const router = require('express').Router();
const user = require('../views/user');
var { ensureAuth } = require('../config/auth');

router.post('/login', user.login);
router.post('/register', user.register);
router.get('/get-current-user', ensureAuth, user.getCurrentUser);
router.get('/logout', user.logout);

module.exports = router;