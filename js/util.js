'use strict';

(function () {
  var getElementDimensions = function (element) {
    var position = element.getBoundingClientRect();
    var width = position.right - position.left;
    var height = position.bottom - position.top;

    return {
      position: position,
      dimensions: {
        width: width,
        height: height
      }
    };
  };

  window.util = {
    getElementDimensions: getElementDimensions
  };
})();
