var Browser = require("zombie");
var browser = new Browser;
var url = "http://localhost:3001";
var app = require('../app'),
    server;

beforeEach( function() {
  server = app.listen(3001);
});

afterEach( function() {
  server.close();
});

describe("test for html", function() {
  
  it("should return true for true", function() {
      expect(true).toBe(true);
  });

  it("sholud check if Express is written on the page", function(done) {
      browser.visit(url, function() {
        expect(browser.html("h1")).toContain('Express');
        done();
      });
  });

  it("should check if the page paragraph is express", function(done) {
    browser.visit(url, function() {
      expect(browser.html("p")).toContain('Welcome to Express');
      done();
    });
  });

});