'use strict';

var request = require('supertest')
, rewire = require('rewire')
, chai = require('chai');
var expect = chai.expect;

var server = rewire('../../src/server');
var app = server.__get__('init')('/api/v1', './src/routes');

describe('GET /time', () => {
  it('should respond with 200 code and the actual time', (done) => {
    request(app)
      .get('/api/v1/time')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(new Date(res.body.time)).to.be.a('Date');
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
