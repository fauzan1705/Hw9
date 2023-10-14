const pool = require('../connection/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const { id, email, gender, password, role } = req.body;

    const query = `INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)`;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw new Error(err.message);
        pool.query(query, [id, email, gender, hash, role], (err, result) => {
            if (err) throw new Error(err.message);
            res.status(200).json({ message: 'Succesfully registered!' });
        });
    });
}

const login = (req, res) => {
    const { email, password } = req.body;

    const getUserByEmail = `SELECT email, password, role FROM users WHERE email = $1`;

    pool.query(getUserByEmail, [email], (err, result) => {
        if (err) throw new Error(err.message);

        if (result.rows.length > 0) {
            bcrypt.compare(password, result.rows[0].password, (err, hashResult) => {
                if (err) throw new Error(err.message);
                if (hashResult) {
                    const token = jwt.sign({ email, role: result.rows[0].role }, 'code-sangat-rahasia', { expiresIn: '1h' });
                    res.json({ token });
                } else {
                    res.status(401).json({ message: 'Wrong Password!' });
                }
            })
        } else {
            res.status(401).json({ message: 'Email is not registered!' });
        }
    })
}

module.exports = { register, login };