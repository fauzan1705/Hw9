const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Homework Rakamin W9",
            version: "1.0.0",
            description: "CRUD on table users & movies with Authentication & Authorization",
            contact: {
                name: "Fauzan Muttaqin",
                email: "Fauzan Muttaqin@gmail.com"
            }
        },
        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
                description: "JWT authorization token"
            }
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./router/*']
};

const specs = swaggerJsdoc(options);

module.exports = specs;