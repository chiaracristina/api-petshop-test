import jwt from 'jsonwebtoken';

const SECRET = 'secret-api-chiara';

const fakeUser = {
  id: 1,
  username: 'admin',
  password: '123456'
};

export const login = (req, res) => {
  const { username, password } = req.body;

  if (username !== fakeUser.username || password !== fakeUser.password) {
    return res.status(401).json({ mensagem: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ id: fakeUser.id, username: fakeUser.username }, SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
};
