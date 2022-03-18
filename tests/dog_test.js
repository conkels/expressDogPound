/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { it, describe, beforeEach } = require('mocha');

const server = require('../index');

const Dog = require('../db');

describe('Test Dog', () => {
  let testDog;

  beforeEach((done) => {
    Dog.deleteMany((err) => {
      if (!err) {
        Dog.create({
          name: 'Clifford',
          age: 15,
          breed: 'Big red',
        }, (error, created) => {
          if (!error) {
            testDog = created;
          }
          return done();
        });
      }
    });
  });

  describe('Test Dog', () => {
    it('Should create a dog', (done) => {
      chai.request(server).post('/dog/create').send({
        name: 'Tilly',
        age: 4,
        breed: 'Staff',
      }).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res).to.haveOwnProperty('text', 'Successfully created');
        return done();
      });
    });

    it('Should NOT create a dog', (done) => {
      chai.request(server).post('/dog/create').send().end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res).to.haveOwnProperty('text', 'Dog validation failed: breed: Path `breed` is required., age: Path `age` is required., name: Path `name` is required.');
        return done();
      });
    });
  });

  it('Should find a Dog', (done) => {
    chai.request(server).get(`/dog/get/${testDog.id}`).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.haveOwnProperty('name', 'Clifford');
      expect(res.body).to.haveOwnProperty('age', 15);
      expect(res.body).to.haveOwnProperty('breed', 'Big red');
      return done();
    });
  });

  it('Should find all Dogs', (done) => {
    chai.request(server).get('/dog/getAll').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.haveOwnProperty('name', 'Clifford');
      expect(res.body).to.haveOwnProperty('age', 15);
      expect(res.body).to.haveOwnProperty('breed', 'Big red');
      return done();
    });
  });

  it('Should replace a dog', (done) => {
    chai.request(server).post(`/dog/replace/${testDog.id}`).send({
      name: 'Tilly',
      age: 4,
      breed: 'Staff',
    }).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(202);
      return done();
    });
  });

  it('Should delete a dog', (done) => {
    chai.request(server).post(`/dog/remove/${testDog.id}`).send().end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(204);
      return done();
    });
  });
});
