const sqlite3 = require('sqlite3').verbose();

// Crear y conectar a la base de datos en memoria
const db = new sqlite3.Database('biblioteca.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite en memoria.');
    }
});

// Crear tablas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla users:', err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla books:', err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS loans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        book_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (book_id) REFERENCES books(id)
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla loans:', err.message);
        }
    });
});

module.exports = db;
