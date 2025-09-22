import { use, expect } from 'chai'
import chaiHttp from 'chai-http';
import request from'supertest';
import express from 'express';

import animalRoutes from '../routes/animalRoutes.js';
import authRoutes from '../routes/authRoutes.js';

const chai = use(chaiHttp)

const app = express();
app.use(express.json());
app.use('/api/animals', animalRoutes);
app.use('/api', authRoutes);

let token;

describe('Petshop API', () => {
  before(async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: '123456' });

    token = res.body.token;
  });

  it('deve fazer login e retornar um token JWT', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: '123456' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('deve cadastrar um novo animal', async () => {
    const res = await request(app)
      .post('/api/animals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Rex',
        especie: 'Cachorro',
        raca: 'Labrador',
        idade: 5,
        dono: 'Chiara'
      });

    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property('nome', 'Rex');
  });

  it('deve listar os animais', async () => {
    const res = await request(app)
      .get('/api/animals')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('cadastro inválido', async () => {
    const res = await request(app)
      .post('/api/animals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        especie: 'Cachorro',
        raca: 'Labrador',
        idade: 5,
        dono: 'Chiara'
      });

    expect(res.statusCode).to.equal(400);
  });
});
