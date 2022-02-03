const isAuthWeb = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const isAuthApi = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    error: -1,
    descripcion: `ruta '${req.baseUrl + req.path}' método '${
      req.method
    }' no autorizada`
  });
};

export { isAuthWeb, isAuthApi };
