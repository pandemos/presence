/**
 * Created by aknauss on 6/21/17.
 */

process.env.NODE_ENV = 'test';
process.env.TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwicm9sZSI6InVzZXIiLCJ1aWQiOjEsImVtYWlsIjoidXNlcjFAZ21haWwuY29tIiwiaWF0IjoxNDk4MDc5NTQzfQ.GcDhwxb6S2-7V201H6LXPrOKgyhFT0jkrcXO40u-4hg';
    // TODO: This needs to be set to a token that effectively never expires, or grab a fresh token each time.

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app/app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('API success tests', () => {

    it('Should return 200 Ok from /GET health', (done) => {
        chai.request(server)
            .get('/health')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.be.null;
                done(err);
            });
    });

    it('Should return 200 status from /GET secured-health if missing auth token', (done) => {
        chai.request(server)
            .get('/secured-health')
            .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                done(err);
            });
    });

    it('Should return 200 Ok and a JWT from /POST login', (done) => {
        chai.request(server)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({username: "test", password: "test"})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.text;
                done(err);
            });
    });
});

describe('API failure tests', () => {

    it('Should return 401 status from /GET secured-health if missing auth token', (done) => {
        chai.request(server)
            .get('/secured-health')
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('Should return 401 if username or password is missing', (done) => {
        chai.request(server)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({})
            .end((err, res) => {
                res.should.have.status(401);
                res.should.not.have.header('Authorization', /^Bearer /);
                done();
            });
    });

});
