const jwt = require("jsonwebtoken");

const auth = function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(
    token,
    "refistrationsusertokensecretkeyss",
    function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: "No token provided" });
      } else {
        req.user = decoded;

        next();
      }
    }
  );
};

module.exports = auth;
