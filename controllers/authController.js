const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { nama, email, password } = req.body;

  if (!nama || !email || !password) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    'INSERT INTO users (nama, email, password) VALUES (?, ?, ?)',
    [nama, email, hashedPassword],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Register berhasil' });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(401).json({ message: 'Email tidak ditemukan' });
      }

      const user = results[0];
      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Password salah' });
      }

      const token = jwt.sign(
        { id_user: user.id_user },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({ token });
    }
  );
};

exports.me = (req, res) => {
  const id_user = req.user.id_user;

  db.query(
    'SELECT id_user, nama, email FROM users WHERE id_user = ?',
    [id_user],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    }
  );
};
