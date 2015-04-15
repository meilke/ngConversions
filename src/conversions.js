angular
  .module('ngConversions', [])
  .factory('$convertParser', function () {
    function parseInput(newValue, multiplier, maxPrecision) {
      var newValueWithCommasReplaced = newValue.toString().replace(',', '.');
      var result = Number(newValueWithCommasReplaced.match('^\\d+(?:\\.\\d{0,' + maxPrecision + '})?'));
      result = parseFloat((result / multiplier).toFixed(maxPrecision + 1));
      return result;
    }

    return {
      parseInput: parseInput
    };
  })
  .factory('$dimensionConvert', function () {
    var CM_TO_INCH_CONVERSION = 0.393701;

    function convertCmToInch(cm, precision) {
      var result = (cm || 0) * CM_TO_INCH_CONVERSION;
      if (precision !== undefined) {
        result = Number(result.toFixed(precision));
      }
      return result;
    }

    function convertInchToCm(inch, precision) {
      var result = (inch || 0) / CM_TO_INCH_CONVERSION;
      if (precision !== undefined) {
        result = Number(result.toFixed(precision));
      }
      return result;
    }

    return {
      CM_TO_INCH_CONVERSION: CM_TO_INCH_CONVERSION,
      convertCmToInch: convertCmToInch,
      convertInchToCm: convertInchToCm
    };
  })
  .factory('$weightConvert', function () {
    var KG_TO_LB_CONVERSION = 2.20462;

    function convertKgToLb(kg, precision) {
      var result = (kg || 0) * KG_TO_LB_CONVERSION;
      if (precision !== undefined) {
        result = Number(result.toFixed(precision));
      }
      return result;
    }

    function convertLbToKg(lb, precision) {
      var result = (lb || 0) / KG_TO_LB_CONVERSION;
      if (precision !== undefined) {
        result = Number(result.toFixed(precision));
      }
      return result;
    }

    return {
      KG_TO_LB_CONVERSION: KG_TO_LB_CONVERSION,
      convertKgToLb: convertKgToLb,
      convertLbToKg: convertLbToKg
    };
  })
  .factory('$unitConvert', function ($dimensionConvert, $weightConvert, $convertParser) {

    function formatResult(result, maxPrecision) {
      return parseFloat((result || 0).toFixed(maxPrecision));
    }

    function getSourceValue(source, property) {
      if (typeof source === 'function') {
        return source()[property];
      }
      return source[property];
    }

    function setSourceValue(source, property, value) {
      if (typeof source === 'function') {
        source()[property] = value;
      } else {
        source[property] = value;
      }
    }

    function parseDimension(enrichedObject, source, property, maxPrecision) {
      if (!maxPrecision && maxPrecision !== 0) {
        maxPrecision = 3;
      }
      Object.defineProperties(enrichedObject, {
        'cm': {
          get: function () {
            return formatResult(getSourceValue(source, property), maxPrecision);
          },
          set: function (newValue) {
            var digits = $convertParser.parseInput(newValue, 1, maxPrecision);
            setSourceValue(source, property, digits);
          }
        },
        'inch': {
          get: function () {
            return formatResult($dimensionConvert.convertCmToInch(getSourceValue(source, property)), maxPrecision);
          },
          set: function (newValue) {
            var digits = $convertParser.parseInput(newValue, $dimensionConvert.CM_TO_INCH_CONVERSION, maxPrecision);
            setSourceValue(source, property, digits);
          }
        }
      });
    }

    function parseWeight(enrichedObject, source, property, maxPrecision) {
      if (!maxPrecision && maxPrecision !== 0) {
        maxPrecision = 3;
      }
      Object.defineProperties(enrichedObject, {
        'kg': {
          get: function () {
            return formatResult(getSourceValue(source, property), maxPrecision);
          },
          set: function (newValue) {
            var digits = $convertParser.parseInput(newValue, 1, maxPrecision);
            setSourceValue(source, property, digits);
          }
        },
        'lb': {
          get: function () {
            return formatResult($weightConvert.convertKgToLb(getSourceValue(source, property)), maxPrecision);
          },
          set: function (newValue) {
            var digits = $convertParser.parseInput(newValue, $weightConvert.KG_TO_LB_CONVERSION, maxPrecision);
            setSourceValue(source, property, digits);
          }
        }
      });
    }

    return {
      dimension: parseDimension,
      weight: parseWeight
    };

  });