const jwt = require("jsonwebtoken");
const { SECRET } = require("../controllers/userController");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user; // adiciona dados do usuário à requisição
    next();
  });
}

module.exports = authenticateToken;
