const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// Rutas para gestionar usuarios, libros y préstamos
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const loanRoutes = require('./routes/loans');

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/loans', loanRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

