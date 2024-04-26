const express = require("express");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY;

const db = new sqlite3.Database("database.db");

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
});

app.use(express.json());

app.post("/registro", (req, res) => {
    const { username, password } = req.body;

    try {
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function (err) {
            if (err) {
                return res.status(500).json({ error: "Erro"});
            }
            res.status(201).json({ message: "Usuário registrado com sucesso"});
        });
    } catch {
        res.status(500).json({ error: "Erro ao registrar usuário"});
    }
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function (err, user) {
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar usuário"});
        }

        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas"});
        }

        const token = jwt.sign({ id: user.id }, SECRET_KEY);
        res.status(200).json({ token });
    });
});

function autenticaToken(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido"});
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido"});
        }
        req.user = user;
        next();
    });
}

app.get("/protegido", autenticaToken, (req, res) => {
    res.json({ message: "Acesso concedido", user: req.user});
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
