describe('Unit conversions', function () {

  var convert, adjustedDimensions, adjustedWeight, originalDimensions, originalWeight;

  beforeEach(module('ngConversions'));
  beforeEach(function () {
    
    originalDimensions = {
      height: 50
    };
    adjustedDimensions = { height: {}, width: {}, depth: {} };

    originalWeight = {
      weight: 30
    };
    adjustedWeight = { weight: {} };

    inject(function ($convert) {
      convert = $convert;
      convert.weight(adjustedWeight, originalWeight, 'weight');
      convert.dimension(adjustedDimensions, originalDimensions, 'height');
    });
    
  });

  it('should keep original height in centimeters', function () {
    assert.equal(originalDimensions.height, adjustedDimensions.height.cm);
  });

  it('should convert height to inches', function () {
    assert.closeTo(parseFloat(adjustedDimensions.height.inch), 19.685, 0.1);
  });

  it('should adjust height in centimeters', function () {
    adjustedDimensions.height.cm = 100;
    assert.equal(originalDimensions.height, 100);
    assert.closeTo(parseFloat(adjustedDimensions.height.inch), 39.37, 0.1);
  });

  it('should adjust height in inches', function () {
    adjustedDimensions.height.inch = 39.37;
    assert.closeTo(originalDimensions.height, 100, 0.1);
    assert.closeTo(parseFloat(adjustedDimensions.height.cm), 100, 0.1);
  });

  it('should keep original weight in kilograms', function () {
    assert.equal(originalWeight.weight, adjustedWeight.weight.kg);
  });

  it('should convert height to pounds', function () {
    assert.closeTo(parseFloat(adjustedWeight.weight.lb), 66.139, 0.1);
  });

  it('should adjust weight in kilograms', function () {
    adjustedWeight.weight.kg = 100;
    assert.equal(originalWeight.weight, 100);
    assert.closeTo(parseFloat(adjustedWeight.weight.lb), 220.462, 0.1);
  });

  it('should adjust weight in pounds', function () {
    adjustedWeight.weight.lb = 220.462;
    assert.closeTo(originalWeight.weight, 100, 0.1);
    assert.closeTo(parseFloat(adjustedWeight.weight.kg), 100, 0.1);
  });

});