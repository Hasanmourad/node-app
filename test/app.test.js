// test/app.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Make sure app.js exports the app instance
const expect = chai.expect;

chai.use(chaiHttp);

describe("GET /db", () => {
  it("should return a message about db connection", (done) => {
    chai
      .request(app)
      .get("/db")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.oneOf([
          "db connection successful",
          "db connection failed"
        ]);
        done();
      });
  });
});
