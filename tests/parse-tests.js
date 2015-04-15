describe('Parser', function () {

  var parser;

  beforeEach(module('ngConversions'));
  beforeEach(function () {
    inject(function ($convertParser) {
      parser = $convertParser;
    });
  });

  it('be able to parse numbers with dot notation', function () {
    assert.equal(parser.parseInput('1.2222', 1, 1), 1.2);
  });

  it('be able to parse numbers with comma notation', function () {
    assert.equal(parser.parseInput('1,2222', 1, 1), 1.2);
  });

  it('be able to parse numbers with a higher precision', function () {
    assert.equal(parser.parseInput('1.2222', 1, 3), 1.222);
  });

  it('be able to parse numbers and also apply some conversion', function () {
    assert.equal(parser.parseInput('1.2', 2, 1), 0.6);
  });

});