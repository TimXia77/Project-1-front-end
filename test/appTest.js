
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
const existUserTest = 'existUserTest';  //should always exist
// const newUserTest = 'newUserTest';      //should never exist

var loginCookie; //transports cookie string between tests
var redirectUrl; //transports redirected urls between tests


describe('Login and Register:\n', () => {
    it('Successfully log in to account (should return 200)', (done) => {
        supertest(app)
            .post('/api/login')
            .send({ email: 'timxia6208@gmail.com', username: 'TimXia77', password: '1a2b3c4D' })
            .expect(302)
            .expect('set-cookie', /token=/)
            .end((err, res) => {
                if (err) throw err;
                redirectUrl = res.headers.location; // for the next test
                loginCookie = res.headers['set-cookie'];
                done();
            });
    });
});