const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM loans', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ loans: rows });
    });
});

router.post('/', (req, res) => {
    const { user_id, book_id } = req.body;
    db.run(`INSERT INTO loans (user_id, book_id) VALUES (?, ?)`, [user_id, book_id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ loanId: this.lastID });
    });
});

module.exports = router;

