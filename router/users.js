const express = require('express');
const users = express.Router();
const verify = require('../middleware/verify.js');
const authorized = require('../middleware/authorized.js');

const { getUsers, getUserById, updateUsers, deleteUsers } = require('../query/users.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: id of the user
 *         email:
 *           type: string
 *           description: email of the user
 *         gender:
 *           type: string
 *           description: gender of the user
 *         password:
 *           type: string
 *           description: password of the user
 *         role :
 *           type: string
 *           description: role of the user
 *       example:
 *         id: 1
 *         email: muttaqinfauzan17@gmail.com
 *         gender: Male
 *         password: root
 *         role: Supervisor
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 * /users:
 *   get:
 *     summary: Lists all the users
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * 
 * /users/{id}:
 *   get:
 *    summary: Retrieve the user by the id
 *    security:
 *       - bearerAuth: []
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: {id: 1, email: muttaqinfauzan17@gmail.com, gender: Male, role: Supervisor}
 *      404:
 *        description: The user was not found!
 *   put:
 *    summary: Update the user by the id
 *    security:
 *       - bearerAuth: []
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: string
 *            example: {email: muttaqinfauzan17@gmail.com, gender: Male, password: root, role: Supervisor}
 *    responses:
 *      200:
 *        description: Succesfully updated user!
 *      404:
 *        description: The user was not found!
 *   delete:
 *     summary: Remove the user by id
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Succesfully deleted user!
 *       404:
 *         description: The user was not found!
 */

users.get('/users', verify, getUsers);

users.route('/users/:id')
    .get(verify, getUserById)
    .put(verify, authorized, updateUsers)
    .delete(verify, authorized, deleteUsers);

module.exports = users;