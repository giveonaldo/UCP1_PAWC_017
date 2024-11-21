const express = require("express");
const router = express.Router();
const db = require("../../database/db");

// GET request hewan
router.get("/", (req, res) => {
  db.query("SELECT * FROM hewan", (err, hewan) => {
    if (err) {
      return res.status(500).send("Internal server rusakk!!!!");
    }
    res.render('hewan', {
      title: "Hewan",
      hewan: hewan,
    })
  });
});

// POST method hewan
router.post("/", (req, res) => {
  const {nama, jumlah, jenis} = req.body;

  if (!nama || !jumlah || !jenis) {
    return res.status(400).send("WAjib di isi")
  }

  db.query(
    "INSERT INTO hewan (nama, jumlah, jenis) VALUES (?,?,?)",
    [nama, jumlah, jenis],
    (err, result) => {
      if (err) return res.status(500).send("server rusakk");
      const newHewan = {
        id: result.insertId,
        nama: nama.trim(),
        jumlah: jumlah.trim(),
        jenis: jenis.trim(),
      };
      res.status(201).json(newHewan)
    }
  )
});

// Route update rusakk
router.put('/:id', (req, res) => {
  const { nama, jumlah, jenis } = req.body;

  db.query(
    "UPDATE hewan SET nama = ?, jumlah = ?, jenis = ? WHERE id = ?",
    [nama, jumlah, jenis, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send("Server Rusakkk");
      if (result.affectedRows === 0) {
        return res.status(404).send("gak tau")
      }
      res.json({id: req.params.id, nama, jumlah, jenis});
    }
  )
})

// Route delete rusak
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM hewan WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send("Server Rusakkk");
      if (result.affectedRows === 0) {
        return res.status(404);
      }
      res.send().status(204);
    }
  );
})

module.exports = router;
