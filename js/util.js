'use strict';

(function () {
  var getElementDimensions = function (element) {
    var dimensions = element.getBoundingClientRect();
    var width = dimensions.right - dimensions.left;
    var height = dimensions.bottom - dimensions.top;

    return {
      width: width,
      height: height
    };
  };

  window.util = {
    getElementDimensions: getElementDimensions
  };
})();
