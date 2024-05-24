const request = require("supertest");
const prisma = require("../config/prisma");
const express = require("express");
const router = require("../routes/user");


describe('POST /user/register', () => {
    const app = express();
    app.use(express.json());
    app.use('/user', router);

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({
                name: "Nuaiman",
                username: "maman",
                email: "maman@gmail.com",
                password: "123",
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
    });
});

describe('POST /user/login', () => {
    const app = express();
    app.use(express.json());
    app.use('/user', router);

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/user/login')
            .send({
                username: "maman",
                password: "123",
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
    });
});

afterAll(async () => {
    await prisma.user.delete({ where: { username: "maman" } });
    await prisma.$disconnect();
});