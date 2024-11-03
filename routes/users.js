const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ users: rows });
    });
});

router.post('/', (req, res) => {
    const { name } = req.body;
    db.run(`INSERT INTO users (name) VALUES (?)`, [name], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ userId: this.lastID });
    });
});

module.exports = router;

