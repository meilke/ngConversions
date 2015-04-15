describe('Unit conversions', function () {

  var unitConvert, adjustedHeight, adjustedDepth, adjustedWeight, originalDimensions, originalWeight;

  beforeEach(module('ngConversions'));
  beforeEach(function () {

    originalDimensions = {
      height: 50,
      depth: 70
    };

    originalWeight = {
      weight: 30
    };

    function originalDimensionsFunc() {
      return originalDimensions;
    }

    adjustedHeight = { };
    adjustedDepth = { };
    adjustedWeight = { };

    inject(function ($unitConvert) {
      unitConvert = $unitConvert;
      unitConvert.weight(adjustedWeight, originalWeight, 'weight');
      unitConvert.dimension(adjustedHeight, originalDimensions, 'height');
      unitConvert.dimension(adjustedDepth, originalDimensionsFunc, 'depth');
    });

  });

  it('should keep original height in centimeters', function () {
    assert.equal(originalDimensions.height, adjustedHeight.cm);
  });

  it('should unitConvert height to inches', function () {
    assert.closeTo(parseFloat(adjustedHeight.inch), 19.685, 0.1);
  });

  it('should adjust height in centimeters', function () {
    adjustedHeight.cm = 100;
    assert.equal(originalDimensions.height, 100);
    assert.closeTo(parseFloat(adjustedHeight.inch), 39.37, 0.1);
  });

  it('should adjust depth when source is function', function () {
    adjustedDepth.cm = 100;
    assert.equal(originalDimensions.depth, 100);
    assert.closeTo(parseFloat(adjustedDepth.inch), 39.37, 0.1);
  });

  it('should adjust height in inches', function () {
    adjustedHeight.inch = 39.37;
    assert.closeTo(originalDimensions.height, 100, 0.1);
    assert.closeTo(parseFloat(adjustedHeight.cm), 100, 0.1);
  });

  it('should keep original weight in kilograms', function () {
    assert.equal(originalWeight.weight, adjustedWeight.kg);
  });

  it('should unitConvert height to pounds', function () {
    assert.closeTo(parseFloat(adjustedWeight.lb), 66.139, 0.1);
  });

  it('should adjust weight in kilograms', function () {
    adjustedWeight.kg = 100;
    assert.equal(originalWeight.weight, 100);
    assert.closeTo(parseFloat(adjustedWeight.lb), 220.462, 0.1);
  });

  it('should adjust weight in pounds', function () {
    adjustedWeight.lb = 220.462;
    assert.closeTo(originalWeight.weight, 100, 0.1);
    assert.closeTo(parseFloat(adjustedWeight.kg), 100, 0.1);
  });

});