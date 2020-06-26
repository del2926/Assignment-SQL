// const jwt = require("jsonwebtoken");

// exports.parseUserToken = (req, res, next) => {
//   console.log(req.headers);
//   const tokenHeader = req.headers.authorization;
//   let token = tokenHeader.split(" ")[1];
//   console.log(token);
//   const verify = jwt.verify(token, "secret");
//   console.log(verify);
//   next();
// };
