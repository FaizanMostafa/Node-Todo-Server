module.exports = {
    ensureAuth: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }

        res.send('Not authorized to see this page.')
    }
}