const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const db = require('./db-main');

const app = express();
const PORT = 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos (serve tudo que está em /frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Configuração do Multer para upload de PDFs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../frontend/arquivos');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        cb(null, 'atividade-' + uniqueSuffix + '.pdf');
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Apenas arquivos PDF são permitidos!'));
        }
    }
});

// ROTAS DE ATIVIDADES
app.get('/atividades', (req, res) => {
    const sql = 'SELECT * FROM atividades ORDER BY id DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.post('/atividades', upload.single('arquivo'), (req, res) => {
    const { titulo, modulo } = req.body;
    const arquivo_path = req.file ? `arquivos/${req.file.filename}` : null;

    if (!titulo || !modulo || !arquivo_path) {
        return res.status(400).json({ error: 'Título, módulo e arquivo PDF são obrigatórios' });
    }

    const sql = 'INSERT INTO atividades (titulo, modulo, arquivo_path) VALUES (?, ?, ?)';
    db.run(sql, [titulo, modulo, arquivo_path], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: 'Atividade cadastrada!' });
    });
});

app.delete('/atividades/:id', (req, res) => {
    const { id } = req.params;

    db.get('SELECT arquivo_path FROM atividades WHERE id = ?', [id], (err, row) => {
        if (err || !row) {
            return res.status(404).json({ error: 'Atividade não encontrada' });
        }

        const filePath = path.join(__dirname, '../frontend', row.arquivo_path);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        db.run('DELETE FROM atividades WHERE id = ?', [id], function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ message: 'Atividade excluída!' });
        });
    });
});

// NOVA ROTA: atualizar só o título (PATCH)
app.patch('/atividades/:id', (req, res) => {
    const { id } = req.params;
    const { titulo } = req.body;

    if (!titulo || !titulo.trim()) {
        return res.status(400).json({ error: 'Título é obrigatório' });
    }

    const sql = 'UPDATE atividades SET titulo = ? WHERE id = ?';
    db.run(sql, [titulo.trim(), id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar título' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Atividade não encontrada' });
        }

        return res.json({ id, titulo: titulo.trim(), message: 'Título atualizado!' });
    });
});

// ROTA PRINCIPAL (apenas index e admin)
app.get(/(.*)/, (req, res, next) => {
    if (req.url.startsWith('/atividades')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Inicialização
app.listen(PORT, () => {
    console.log(`
    =========================================
    🚀 Servidor ON: http://localhost:${PORT}
    📁 Frontend: ${path.join(__dirname, '../frontend')}
    👨‍💼 Admin:   http://localhost:3000/pages/admin.html
    =========================================
    `);
});
