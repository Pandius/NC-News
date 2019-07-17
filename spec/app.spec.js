process.env.NODE_ENV = 'test';
const connection = require('../db/connection');
const chai = require('chai');
const {expect} = chai;
const app = require('../app.js');
const request = require('supertest');

describe('/*', () => {
  after(() => connection.destroy());
  beforeEach(() => connection.seed.run());
  it('GET status 404, responds with the message Page not found for wrong address', () => {
    return request(app)
      .get('/wrongaddress')
      .expect(404)
      .then(({body}) => {
        expect(body.msg).to.equal('Page not found');
      });
  });
  describe('/api', () => {
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
      it('Method not allowed: status 405 for /topics', () => {
        const invalidMethods = ['patch', 'put', 'post', 'delete'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]('/api/topics')
            .expect(405)
            .then(({body}) => {
              expect(body.msg).to.equal('Method not allowed');
            });
        });
        return Promise.all(methodPromises);
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
        it('Method not allowed: status 405 for /users/:username', () => {
          const invalidMethods = ['patch', 'put', 'post', 'delete'];
          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]('/api/users/rogersop')
              .expect(405)
              .then(({body}) => {
                expect(body.msg).to.equal('Method not allowed');
              });
          });
          return Promise.all(methodPromises);
        });
        it(' GET status 404, for valid but non existing user', () => {
          return request(app)
            .get('/api/users/nousername')
            .expect(404)
            .then(({body}) => {
              expect(body.msg).to.be.equal('user doesnt exists');
            });
        });
      });
    });
    describe('/articles', () => {
      describe('/articles/articles_id', () => {
        it('GET status 200, returns an article by article id', () => {
          return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({body}) => {
              expect(body.article).to.have.keys(
                'article_id',
                'title',
                'body',
                'votes',
                'topic',
                'author',
                'created_at',
                'comment_count'
              );
            });
        });
        it('Method not allowed: status 405 for /articles/:article_id', () => {
          const invalidMethods = ['put', 'post', 'delete'];
          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]('/api/articles/1')
              .expect(405)
              .then(({body}) => {
                expect(body.msg).to.equal('Method not allowed');
              });
          });
          return Promise.all(methodPromises);
        });
        it('GET status 400, for not valid article id, returns an err message', () => {
          return request(app)
            .get('/api/articles/string')
            .expect(400)
            .then(({body}) => {
              expect(body.msg).to.equal('Invalid article id');
            });
        });
        it('GET status 400, for non existing valid article id, returns an err message', () => {
          return request(app)
            .get('/api/articles/99999')
            .expect(404)
            .then(({body}) => {
              expect(body.msg).to.equal('article not found');
            });
        });
        it('PATCH status 200, returns an updated article', () => {
          return request(app)
            .patch('/api/articles/2')
            .send({inc_votes: 1})
            .expect(200)
            .then(({body}) => {
              expect(body.article[0]).to.contain.keys(
                'article_id',
                'title',
                'body',
                'votes',
                'topic',
                'author',
                'created_at'
              );
              expect(body.article[0].votes).to.equal(1);
            });
        });
        it('POST status 201, returns an posted comment', () => {
          return request(app)
            .post('/api/articles/2/comments')
            .send({
              username: 'lurker',
              body: 'this is new comment'
            })
            .expect(201)
            .then(({body}) => {
              expect(body.comment[0].comment_id).to.equal(19);
              expect(body.comment[0].author).to.equal('lurker');
              expect(body.comment[0].article_id).to.equal(2);
              expect(body.comment[0].votes).to.equal(0);
              expect(body.comment[0].body).to.equal('this is new comment');
            });
        });
      });
    });
  });
});
