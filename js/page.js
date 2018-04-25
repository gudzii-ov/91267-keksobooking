'use strict';

(function () {
  var deactivatePage = function (map) {
    map.classList.add('map--faded');
    window.form.disableForm();
  };

  var activatePage = function (map) {
    map.classList.remove('map--faded');
    window.form.enableForm();
  };

  window.page = {
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };
})();
