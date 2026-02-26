const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar no banco:", err.message);
    } else {
        console.log("Conectado ao banco SQLite.");
    }
});

// Inicialização das Tabelas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS atividades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        modulo TEXT NOT NULL,
        arquivo_path TEXT NOT NULL
    )`);
});

module.exports = db;
