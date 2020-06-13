module.exports = {
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) return next();
        return res.status(401).json({
            success: false,
            message: 'You need to login to access this page'
        });
    }
}