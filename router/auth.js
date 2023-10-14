const express = require('express');
const auth = express.Router();

const { register, login } = require('../query/auth.js');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Succesfully registered!
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: {email: muttaqinfauzan17@gmail.com, password: root}
 *     responses:
 *       200:
 *         description: Login.
 *         content:
 *           application/json:
 *             schema:
 *              type: string
 *              example: {token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9}
 * 
 */

auth.post('/register', register);
auth.post('/login', login);

module.exports = auth;