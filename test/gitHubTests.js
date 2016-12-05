var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect
var dotenv = require('dotenv');
dotenv.load();
var jsdom = require('jsdom');

global.document = jsdom.jsdom('https://github.com/octocat');
global.window = document.defaultView;
var $ = require('jquery')

describe('GitHub API', function() {
  it('should have a valid response', function(done){
    var param = "?client_id=" + dotenv['GITHUB_CLIENT_ID'] + "&client_secret=" + dotenv['GITHUB_SECRET'];
    chai.request('https://api.github.com')
    .get('/users/octocat/repos' + param)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('GitHub User Profile', function() {
  it('should have a picture', function(){
    expect($('vcard-avatar')).to.exist;
  });
});
