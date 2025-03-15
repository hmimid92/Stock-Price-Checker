const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Viewing one stock', function (done) {
      chai
      .request(server)
      .keepOpen()
      .get('/api/stock-prices/')
      .query(
        {stock: 'GOOG'
        })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body['stockData'].stock,'GOOG');
        done();
       });
     });

     test('Viewing one stock and liking it', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/stock-prices/')
        .query(
          {
            stock: 'GOOG',
            like: true
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body['stockData'].likes,1);
          done();
         });
       });

     test('Viewing the same stock and liking it again', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/stock-prices/')
        .query(
          {stock: ['GOOG','GOOG'],
           like: true
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body['stockData']);
          done();
         });
     });

     test('Viewing two stocks', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/stock-prices/')
        .query(
          {stock: ['GOOG','MSFT'],
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body['stockData'][0].stock,'GOOG');
          assert.equal(res.body['stockData'][1].stock,'MSFT');
          done();
         });
     });

     test('Viewing two stocks and liking them', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/stock-prices/')
        .query(
          {stock: ['GOOG','MSFT'],
           like: true
          })
        .end(function (err, res) {

          assert.equal(res.status, 200);
          assert.equal(res.body['stockData'][0].stock,'GOOG');
          assert.equal(res.body['stockData'][1].stock,'MSFT');
          done();
         });
     });

 });
