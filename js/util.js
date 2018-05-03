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

  var onLoadError = function (message) {
    console.error(message); // TODO
  };

  var deactivatePage = function (map) {
    map.classList.add('map--faded');
    window.form.disableForm();
  };

  var activatePage = function (map) {
    map.classList.remove('map--faded');
    window.form.enableForm();
  };

  window.util = {
    getElementDimensions: getElementDimensions,
    onLoadError: onLoadError,
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };
})();
