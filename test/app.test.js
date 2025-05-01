const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // adjust if app is elsewhere

const expect = chai.expect;
chai.use(chaiHttp);

describe('App Integration Tests', () => {
  it('should connect to the database successfully', (done) => {
    chai
      .request(app)
      .get('/db')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('db connection');
        done();
      });
  });

  it('should connect to Redis successfully', (done) => {
    chai
      .request(app)
      .get('/redis')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('redis');
        done();
      });
  });
});
