function isAuthenticated(req, res, next) {
  console.log('isAuthenticated Middleware');
  console.log('User:', req.user);
  
  if (req.user) {
    console.log('User is authenticated, proceeding to next middleware/route handler.');
    return next();
  }

  console.log('User is not authenticated, redirecting to login page.');
  res.redirect('/auth/login-page');
}

module.exports = isAuthenticated;
