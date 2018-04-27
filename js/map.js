'use strict';

var mapBlock = document.querySelector('.map');
window.page.deactivatePage(mapBlock);

var mainPinElement = mapBlock.querySelector('.map__pin--main');
var mainPinInactiveCoords = window.card.getPinCoords(mapBlock, mainPinElement, false);
window.form.fillAddress(mainPinInactiveCoords.pinX + ', ' + mainPinInactiveCoords.pinY);

var generatedOffers = window.dummyData.generateOffers();

var mainPinFirstMouseupHandler = function () {
  window.page.activatePage(mapBlock);
  window.card.placePins(generatedOffers);

  mainPinElement.removeEventListener('mouseup', mainPinFirstMouseupHandler);
};

mainPinElement.addEventListener('mouseup', mainPinFirstMouseupHandler);

window.card.addMainPinMousedownHandler(mapBlock, mainPinElement);
