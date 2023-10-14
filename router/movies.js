const express = require('express');
const movies = express.Router();
const verify = require('../middleware/verify.js');
const { getMovies, getMovieById, createMovies, updateMovies, deleteMovies } = require('../query/movies.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: id of the movie
 *         title:
 *           type: string
 *           description: title of the movie
 *         genres:
 *           type: string
 *           description: genres of the movie
 *         year:
 *           type: string
 *           description: year of the movie
 *       example:
 *         id: 110
 *         title: The Last of Us
 *         genres: Adventure|Action|Horror
 *         year: 2023
 */

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The movies managing API
 * /movies:
 *   get:
 *     summary: Lists all the movies
 *     security:
 *       - bearerAuth: []
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: The list of the movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *   post:
 *     summary: Create a new movie
 *     security:
 *       - bearerAuth: []
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Succesfully created new movie!.
 * 
 * /movies/{id}:
 *   get:
 *    summary: Retrieve the movie by the id
 *    security:
 *       - bearerAuth: []
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The movie id
 *    responses:
 *      200:
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *      404:
 *        description: The movie was not found!
 *   put:
 *    summary: Update the movie by the id
 *    security:
 *       - bearerAuth: []
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The movie id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: string
 *            example: {title: The Last of Us, genres: Adventure|Action|Horror, year: 2023}
 *    responses:
 *      200:
 *        description: Succesfully updated movie!
 *      404:
 *        description: The movie was not found!
 *   delete:
 *     summary: Remove the movie by id
 *     security:
 *       - bearerAuth: []
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The movie id
 *     responses:
 *       200:
 *         description: Succesfully deleted movie!
 *       404:
 *         description: The movie was not found!
 */

movies.route('/movies')
    .get(verify, getMovies)
    .post(verify, createMovies);

movies.route('/movies/:id')
    .get(verify, getMovieById)
    .put(verify, updateMovies)
    .delete(verify, deleteMovies);

module.exports = movies;