const jsonwebtoken = require("jsonwebtoken");

exports.protected = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json("no auth");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jsonwebtoken.verify(token, process.env.Secret_key);
      req.user = decoded.id;
  } catch (error) {
    console.log(error);
  }
  //   console.log(req.headers.authorization.split(" ")[1]);
  next();
};
