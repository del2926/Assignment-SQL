const jwt = require("jsonwebtoken");

const models = require("../models");

exports.authenticateUser = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (tokenHeader) {
    let token = tokenHeader.split(" ")[1];
    jwt
      .verify(token, "secret", (err, result) => {
        return models.user.findByPk(result.userId);
      })
      .then((user) => {
        req.user = user;
        next();
      });
  } else {
    res.sendStatus(401);
  }
};
