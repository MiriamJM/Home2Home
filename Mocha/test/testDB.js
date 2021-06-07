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
		chai.request("https://home2hometravel.azurewebsites.net")
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
    
	it('The first entry in the array has known properties', function () {
		expect(requestResult[0]).to.have.property('owner');
	    expect(requestResult[0]).to.have.property('_id');
		expect(response.body).to.not.be.a.string;
	});
	it('The elements in the array have the expected properties', function(){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('_id');
					expect(body[i]).to.have.property('owner');
					expect(body[i]).to.have.property('propertyName');
					expect(body[i]).to.have.property('description');
					expect(body[i]).to.have.property('bedrooms');
					expect(body[i]).to.have.property('bathrooms');
					expect(body[i]).to.have.property('address');
				}
				return true;
			});
	});	
	
});


describe('Test property result', function () {

	var requestResult;
	var response;

	before(function (done) {
		chai.request("https://home2hometravel.azurewebsites.net")
			.get("/app/properties/116493887325549378604")
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
		expect(requestResult).to.have.property('_id');
		expect(requestResult).to.have.property('owner');
		expect(requestResult).to.have.property('propertyName');
		expect(requestResult).to.have.property('bedrooms');
		expect(requestResult).to.have.property('sqFeet');
		expect(response.body).to.not.be.a.string;
	});
	it('The elements in the array have the expected properties', function () {
		expect(response.body).to.satisfy(
			function (body) {
				expect(body).to.have.property('owner');
				expect(body).to.have.property('propertyName');
				expect(body).to.have.property('description');
				expect(body).to.have.property('bedrooms');
				expect(body).to.have.property('bathrooms');
				expect(body).to.have.property('sqFeet');
				expect(body).to.have.property('address');
				return true;
			});
	});

});


describe('Test Travler result', function () {

	var requestResult;
	var response;

	before(function (done) {
		chai.request("https://home2hometravel.azurewebsites.net")
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
					expect(body[i]).to.have.property('locationPreferences');
					expect(body[i]).to.have.property('datePreferences');
				}
				return true;
			});
	});

});

describe('Test Travler result', function () {

	var requestResult;
	var response;

	before(function (done) {
		chai.request("https://home2hometravel.azurewebsites.net")
			.post("/app/users")
			.send(
				{
					"locationPreferences": ["Tuscon"],
					"datePreferences": [],
					"userId": 116387948649455570000,
					"fName": "Jeff",
				}
			)
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Should return an ok response', function () {
		expect(response).to.have.status(200);
		expect(response).to.have.headers;
	});

});