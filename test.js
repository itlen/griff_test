const request = require("supertest");
var app = require("./server.js").app;

describe('Test index GET request', function() {
  it('Responds with 200 response code', function(done) {
    request(app)
      .get('/')
      .expect('Content-type','text/html; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

let testIt = [
  {
    city: 'Paris',
    real: true // City is real, test must be ok
  },
  {
    city: 'Paris',
    real: false // City is real, test must fall down
  },
  {
    city: 'Uta',
    real: true // City is real, test must be ok
  },
  {
    city: 'Uta',
    real: false // City is real, test must fall down
  },
  {
    city: 'Chicago',
    real: true
  },
  {
    city: 'Sin City',
    real: false  // City is not real and we say that it's false, test must be ok
  },
  {
    city: 'Sin City',
    real: true  // City is unreal, test must fall down
  }
];

describe('Test POST request', function() {

  testIt.forEach(function(item){

    var city = item.city.toString();
    var expectedStatus = item.real;

      it(`Request for [${city}, ${expectedStatus}]`, function(done) {

        request(app)
          .post('/')
          .send(`city=${city}`)
          .expect('Content-type','text/html; charset=utf-8')
          .expect(200)
          .expect(function(res) {

            var realStatus = res.text.indexOf(city) > -1 ? true : false;
            var result = realStatus == expectedStatus ? true : false;

            if (!result) throw new Error('Test failed');

          })
          .end(function(err){
            if (err) return done(err);
            done();
          })
      });

    });

});

