angular
.module('ngConversions', [])
.factory('$dimensionConvert', function() {
  var CM_TO_INCH_CONVERSION = 0.393701;

  function convertCmToInch(cm, precision) {
    var result = (cm || 0) * CM_TO_INCH_CONVERSION;
    if(precision !== undefined)
      result = Number(result.toFixed(precision));
    return result;
  }

  function convertInchToCm(inch, precision) {
    var result = (inch || 0) / CM_TO_INCH_CONVERSION;
    if(precision !== undefined)
      result = Number(result.toFixed(precision));
    return result;
  }

  return {
    CM_TO_INCH_CONVERSION: CM_TO_INCH_CONVERSION,
    convertCmToInch: convertCmToInch,
    convertInchToCm: convertInchToCm,
  };
})
.factory('$weightConvert', function() {
  var KG_TO_LB_CONVERSION = 2.20462;

  function convertKgToLb(kg, precision) {
    var result = (kg || 0) * KG_TO_LB_CONVERSION;
    if(precision !== undefined)
      result = Number(result.toFixed(precision));
    return result;
  }

  function convertLbToKg(lb, precision) {
    var result = (lb || 0) / KG_TO_LB_CONVERSION;
    if(precision !== undefined)
      result = Number(result.toFixed(precision));
    return result;
  }

  return {
    KG_TO_LB_CONVERSION: KG_TO_LB_CONVERSION,
    convertKgToLb: convertKgToLb,
    convertLbToKg: convertLbToKg,
  };
})
.factory('$convert', function($dimensionConvert, $weightConvert) {

  function parseDimension(enrichedObject, source, property) {
    Object.defineProperties(enrichedObject[property], {
      'cm': {
        get: function () {
          return formatResult(source[property], 3);
        },
        set: function (newValue) {
          var digits = getDigits(newValue, 1);
          source[property] = digits;
        }
      },
      'inch': {
        get: function () {
          return formatResult($dimensionConvert.convertCmToInch(source[property]), 3);
        },
        set: function (newValue) {
          var digits = getDigits(newValue, $dimensionConvert.CM_TO_INCH_CONVERSION);
          source[property] = digits;
        }
      }
    });
  }

  function parseWeight(enrichedObject, source, property) {
    Object.defineProperties(enrichedObject[property], {
      'kg': {
        get: function () {
          return formatResult(source[property], 3);
        },
        set: function (newValue) {
         var digits = getDigits(newValue, 1);
         source[property] = digits;
       }
     },
     'lb': {
        get: function () {
          return formatResult($weightConvert.convertKgToLb(source[property]), 3);
        },
        set: function (newValue) {
          var digits = getDigits(newValue, $weightConvert.KG_TO_LB_CONVERSION);
          source[property] = digits;
        }
      }
    });
  }

  function getDigits(newValue, multiplier) {
    var digits = parseInput(newValue);
    digits = parseFloat((digits / multiplier).toFixed(6));
    return digits;
  }

  function parseInput(newValue) {
    var digits = ('' + newValue).replace(',', '.').replace(/[^0-9.]/g,'');
    if(digits) {
      digits = parseFloat(digits);
      return digits;
    }
    return 0;
  }

  function formatResult(result, maxPrecision) {
    var str = parseFloat((result || 0).toFixed(maxPrecision)).toString();
    if(str.split('.')[1])
      result = result.toFixed(str.split('.')[1].length > maxPrecision ? maxPrecision : str.split('.')[1].length );
    else result = (result || 0).toFixed(1);
    return result;
  }

  return {
    dimension: parseDimension,
    weight: parseWeight
  }

});