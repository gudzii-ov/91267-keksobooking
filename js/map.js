'use strict';

var mapBlock = document.querySelector('.map');
window.page.deactivatePage(mapBlock);

var mainPinElement = mapBlock.querySelector('.map__pin--main');
var mainPinInactiveCoords = window.card.getPinCoords(mainPinElement, false);
window.form.fillAddress(mainPinInactiveCoords.pinX + ', ' + mainPinInactiveCoords.pinY);

var generatedOffers = window.dummyData.generateOffers();

var mainPinMouseupHandler = function () {
  var mainPinActiveCoords = window.card.getPinCoords(mainPinElement, true);

  window.page.activatePage(mapBlock);
  window.card.placePins(generatedOffers);
  window.form.fillAddress(mainPinActiveCoords.pinX + ', ' + mainPinActiveCoords.pinY);
};

mainPinElement.addEventListener('click', mainPinMouseupHandler);
