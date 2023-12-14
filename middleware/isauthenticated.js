function isAuthenticated(req, res, next) {
    if (req.user) {
      return next();
    }
  
    res.redirect('/posts/register');
  }
  
  module.exports = isAuthenticated;