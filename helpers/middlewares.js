// Smart middleware
exports.isRole = function (role) {
  return function (req, res, next) {
    if (req.user.role === role) next()
    else res.send("No tienes el rol de " + role) 
  }
}

// Session middleware
exports.isAuth = function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/')
  } else {
    next()
  }
}

// Roles middleware
exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect ('/login?next=' + req.path)
  }
}
exports.isAdmin = function (req, res, next) {
  if (req.user.role === 'Admin') {
    next()
  } else {
    res.redirect ('/login?next=' + req.path)
  }
}