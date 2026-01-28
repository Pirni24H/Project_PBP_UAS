const db = require('../config/db');

exports.createDisaster = (req, res) => {
  const { nama_bencana, lokasi, tanggal, status } = req.body;

  db.query(
    'INSERT INTO disasters (nama_bencana, lokasi, tanggal, status) VALUES (?, ?, ?, ?)',
    [nama_bencana, lokasi, tanggal, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({
        message: 'Data bencana berhasil ditambahkan',
        id_disaster: result.insertId
      });
    }
  );
};

exports.getDisasters = (req, res) => {
  db.query(
    'SELECT * FROM disasters',
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.getDisasterById = (req, res) => {
  const { id } = req.params;

  db.query(
    'SELECT * FROM disasters WHERE id_disaster = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(404).json({ message: 'Bencana tidak ditemukan' });
      }
      res.json(results[0]);
    }
  );
};

exports.updateDisaster = (req, res) => {
  const { id } = req.params;
  const { nama_bencana, lokasi, tanggal, status } = req.body;

  db.query(
    'UPDATE disasters SET nama_bencana=?, lokasi=?, tanggal=?, status=? WHERE id_disaster=?',
    [nama_bencana, lokasi, tanggal, status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Data bencana berhasil diperbarui' });
    }
  );
};


exports.deleteDisaster = (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM disasters WHERE id_disaster = ?',
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Data bencana berhasil dihapus' });
    }
  );
};
