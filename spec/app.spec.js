process.env.NODE_ENV = 'test';
const connection = require('../db/connection');
const chai = require('chai');
const {expect} = chai;
const app = require('../app.js');
const request = require('supertest');

describe('/*', () => {
  after(() => connection.destroy());
  beforeEach(() => connection.seed.run());
  describe('/topics', () => {
    it('GET status 200, returns an array of topics objects', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
          expect(body.topics).to.be.an('Array');
          expect(body.topics[0]).to.have.keys('slug', 'description');
        });
    });
  });
  describe('/users', () => {
    describe('/users/:username', () => {
      it(' GET status 200, returns an user by his username', () => {
        return request(app)
          .get('/api/users/rogersop')
          .expect(200)
          .then(({body}) => {
            expect(body.user.username).to.be.equal('rogersop');
            expect(body.user).to.have.keys('username', 'avatar_url', 'name');
          });
      });
    });
  });
});
