'use strict';

var mapBlock = document.querySelector('.map');
window.page.deactivatePage(mapBlock);

var generatedOffers = window.dummyData.generateOffers();

var mainPinMouseupHandler = function () {
  window.page.activatePage(mapBlock);
  window.card.placePins(generatedOffers);
};

var mainPinElement = mapBlock.querySelector('.map__pin--main');

mainPinElement.addEventListener('click', mainPinMouseupHandler);
