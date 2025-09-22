const users = require("../data/users");
const generateToken = require("../utils/generateToken");

// Login de usuário
exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = generateToken();
  return res.json({ token, user: { id: user.id, name: user.name, coins: user.coins } });
};

// Cadastro de novo usuário
exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  if (users.some(u => u.email === email)) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  const newUser = {
    id: `u${users.length + 1}`,
    name,
    email,
    password,
    coins: 0
  };

  users.push(newUser);

  return res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
};
