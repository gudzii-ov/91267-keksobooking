'use strict';

/* генерируем данные */
var generatedOffers = window.dummyData.generateOffers();

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

window.card.placePins(generatedOffers);
