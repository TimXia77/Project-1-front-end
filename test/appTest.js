
//Requires:
const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest'); //limitations with chai-http -> redirects automatically 
const app = require("../server");
// const cookieParser = require("cookie-parser");


//Middleware
const { expect } = chai;
chai.use(chaiHttp);
// app.use(cookieParser());

//constants
// const existUserTest = 'existUserTest';  //should always exist
// const newUserTest = 'newUserTest';      //should never exist

// var loginCookie; //transports cookie string between tests
// var redirectUrl; //transports redirected urls between tests


describe('Login and Register:\n', () => {
    it('Successfully registered account (should return 200)', (done) => {
        supertest(app)
            .post('/register')
            .send({ email: 'TestTest@test.test', username: existUserTest, password: 'existUser123' })
            .expect(200)
            .expect((res) => {
                if (!(res.body.cookie)) {
                  throw new Error('Cookie not found in response body');
                }})
            .end((err, res) => {
                if (err) throw err;
                loginCookie = res.body.cookie;
                done();
            });

    });
});