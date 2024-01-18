module.exports = {
    authentication: async (req, res, next) => {
      try {
        if (req.session.isAuthenticated) {
          return next();
        } 
        else {
          return res.redirect("/");
        }
      } catch (error) {
        next(error);
      }
    },
    authorization: async (req, res, next) => {
      if (req.session.isAuthenticated && req.session.role) {
        let originalUrl = req.originalUrl;
        let role = req.session.role;
        if (originalUrl.startsWith(`/${role}`)) {
          next();
        } else {
          return res.status(403).send("You don't have permission to access this page");
        }
      }
    }
  };