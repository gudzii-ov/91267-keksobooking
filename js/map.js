'use strict';

var mapBlock = document.querySelector('.map');
window.page.deactivatePage(mapBlock);

var mainPinElement = mapBlock.querySelector('.map__pin--main');
var mainPinInactiveCoords = window.pin.getPinCoords(mapBlock, mainPinElement, false);
window.form.fillAddress(mainPinInactiveCoords.pinX + ', ' + mainPinInactiveCoords.pinY);

var filtersElement = mapBlock.querySelector('.map__filters-container');
// var cardElement = window.card.getOfferCardElement();
mapBlock.insertBefore(window.card.cardElement, filtersElement);

var onLoadError = function (message) {
  console.error(message); // TODO
};

var mainPinFirstMouseupHandler = function (evt) {
  evt.preventDefault();
  window.page.activatePage(mapBlock);

  window.load(window.pin.placePins, onLoadError);

  mainPinElement.removeEventListener('mouseup', mainPinFirstMouseupHandler);
};

mainPinElement.addEventListener('mouseup', mainPinFirstMouseupHandler);

window.pin.addMainPinMousedownHandler(mapBlock, mainPinElement);
