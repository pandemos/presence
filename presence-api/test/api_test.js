/**
 * Created by aknauss on 6/21/17.
 */

process.env.NODE_ENV = 'test';
process.env.TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwicm9sZSI6ImFkbWluIiwidWlkIjoxLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTQ5ODA4MDUzNX0.OdoxS6YkoKRlMCmT_FbfmAcGdODsELSn3UEkU_7l_Qc';
    // TODO: This needs to be set to a token that effectively never expires, or grab a fresh token each time.

process.env.DB_URL = 'mongodb://localhost/presence-test'

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

    it('Should return a list of existing users', done => {
       chai.request(server)
           .get('/user')
           .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.an('array');
               done(err);
           });
    });

    it('Should return the requested user', done => {
        chai.request(server)
            .get('/user/1')
            .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.uid.should.equal(1);
                done(err);
            });
    });

    it('Should create the user and return 200 Ok', done => {
       chai.request(server)
           .post('/user')
           .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN)
           .send({
               username: "user",
               email: "user@email.com",
               role: "user",
               password: "changeme",
               teams: ["default"],
               availability: {},
               uid: 1
           })
           .end((err, res) => {
               res.should.have.status(200);
               done(err);
           });

    });

    it('Should set core hours and return 200 Ok', done => {
       chai.request(server)
           .post('/availability/1')
           .set('Authorization', 'Bearer ' + process.env.TEST_TOKEN)
           .send({
               start: 900,
               end: 1700,
               tz: '-5:00'
           })
           .end((err, res) => {
               res.should.have.status(200);
               done(err)
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
