var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Test property result', function () {

	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:8080")
			.get("/app/properties")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return an array object with more than 1 object', function (){
		expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(1);
		expect(response).to.have.headers;
    });
    
	it('The first entry in the array has known properties', function(){
		expect(requestResult[0]).to.include.keys('propertyId');
	    expect(requestResult[0]).to.have.property('_id');
		expect(response.body).to.not.be.a.string;
	});
	it('The elements in the array have the expected properties', function(){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('propertyId');
					expect(body[i]).to.have.property('propertyName');
				}
				return true;
			});
	});	
	
});


describe('Test property result', function () {

	var requestResult;
	var response;

	before(function (done) {
		chai.request("http://localhost:8080")
			.get("/app/properties/123")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Should return an object', function () {
		expect(response).to.have.status(200);
		expect(response).to.have.headers;
	});

	it('The entry has known properties', function () {
		expect(requestResult).to.include.keys('propertyId');
		expect(requestResult).to.have.property('_id');
		expect(response.body).to.not.be.a.string;
	});
	it('The elements in the array have the expected properties', function () {
		expect(response.body).to.satisfy(
			function (body) {

				expect(body).to.have.property('propertyId');
				expect(body).to.have.property('propertyName');
				return true;
			});
	});

});


describe('Test Travler result', function () {

	var requestResult;
	var response;

	before(function (done) {
		chai.request("http://localhost:8080")
			.get("/app/users")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Should return an array object with more than 1 object', function () {
		expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(1);
		expect(response).to.have.headers;
	});

	it('The first entry in the array has known properties', function () {
		expect(requestResult[0]).to.include.keys('userId');
		expect(requestResult[0]).to.have.property('_id');
		expect(response.body).to.not.be.a.string;
	});
	it('The elements in the array have the expected properties', function () {
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('userId');
					expect(body[i]).to.have.property('fName');
				}
				return true;
			});
	});

});