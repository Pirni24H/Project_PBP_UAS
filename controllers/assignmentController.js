const db = require('../config/db');

exports.createAssignment = (req, res) => {
  const { id_volunteer, id_disaster, tugas } = req.body;

  if (!id_volunteer || !id_disaster || !tugas) {
    return res.status(400).json({ message: 'Data assignment tidak lengkap' });
  }

  db.query(
    'INSERT INTO assignments (id_volunteer, id_disaster, tugas) VALUES (?, ?, ?)',
    [id_volunteer, id_disaster, tugas],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: 'Assignment berhasil dibuat',
        id_assignment: result.insertId
      });
    }
  );
};


exports.getAssignments = (req, res) => {
  db.query(
    `SELECT 
        a.id_assignment,
        u.nama AS nama_volunteer,
        d.nama_bencana,
        a.tugas,
        a.created_at
     FROM assignments a
     JOIN volunteers v ON a.id_volunteer = v.id_volunteer
     JOIN users u ON v.id_user = u.id_user
     JOIN disasters d ON a.id_disaster = d.id_disaster`,
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.getAssignmentById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT 
        a.id_assignment,
        u.nama AS nama_volunteer,
        d.nama_bencana,
        a.tugas,
        a.created_at
     FROM assignments a
     JOIN volunteers v ON a.id_volunteer = v.id_volunteer
     JOIN users u ON v.id_user = u.id_user
     JOIN disasters d ON a.id_disaster = d.id_disaster
     WHERE a.id_assignment = ?`,
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(404).json({ message: 'Assignment tidak ditemukan' });
      }
      res.json(results[0]);
    }
  );
};


exports.deleteAssignment = (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM assignments WHERE id_assignment = ?',
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Assignment berhasil dihapus' });
    }
  );
};
