const db = require('../config/db');

exports.getUsers = (req, res) => {
  db.query(
    'SELECT id_user, nama, email FROM users',
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.getUserById = (req, res) => {
  const { id } = req.params;

  db.query(
    'SELECT id_user, nama, email FROM users WHERE id_user = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }
      res.json(results[0]);
    }
  );
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  db.query(
    'UPDATE users SET nama = ?, email = ? WHERE id_user = ?',
    [name, email, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'User berhasil diperbarui' });
    }
  );
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM users WHERE id_user = ?',
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'User berhasil dihapus' });
    }
  );
};