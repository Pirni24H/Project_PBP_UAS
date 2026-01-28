const db = require('../config/db');

exports.createVolunteer = (req, res) => {
  const { id_user, skill } = req.body;

  if (!id_user || !skill) {
    return res.status(400).json({ message: 'id_user dan skill wajib diisi' });
  }

  db.query(
    'INSERT INTO volunteers (id_user, skill) VALUES (?, ?)',
    [id_user, skill],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({
        message: 'Volunteer berhasil ditambahkan',
        id_volunteer: result.insertId
      });
    }
  );
};

exports.getVolunteers = (req, res) => {
  db.query(
    `SELECT v.id_volunteer, u.nama, u.email, v.skill, v.created_at
     FROM volunteers v
     JOIN users u ON v.id_user = u.id_user`,
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.getVolunteerById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT v.id_volunteer, u.nama, u.email, v.skill, v.created_at
     FROM volunteers v
     JOIN users u ON v.id_user = u.id_user
     WHERE v.id_volunteer = ?`,
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(404).json({ message: 'Volunteer tidak ditemukan' });
      }
      res.json(results[0]);
    }
  );
};

exports.deleteVolunteer = (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM volunteers WHERE id_volunteer = ?',
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Volunteer berhasil dihapus' });
    }
  );
};
