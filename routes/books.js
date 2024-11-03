const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ books: rows });
    });
});

router.post('/', (req, res) => {
    const { title } = req.body;
    db.run(`INSERT INTO books (title) VALUES (?)`, [title], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ bookId: this.lastID });
    });
});

module.exports = router;

