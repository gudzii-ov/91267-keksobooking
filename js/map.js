'use strict';

var mapBlock = document.querySelector('.map');
window.page.deactivatePage(mapBlock);

var mainPinElement = mapBlock.querySelector('.map__pin--main');
var mainPinInactiveCoords = window.card.getPinCoords(mainPinElement, false);
window.form.fillAddress(mainPinInactiveCoords.pinX + ', ' + mainPinInactiveCoords.pinY);

var generatedOffers = window.dummyData.generateOffers();

var mainPinFirstMouseupHandler = function () {
  window.page.activatePage(mapBlock);
  window.card.placePins(generatedOffers);

  mainPinElement.removeEventListener('mouseup', mainPinFirstMouseupHandler);
};

mainPinElement.addEventListener('mouseup', mainPinFirstMouseupHandler);

var mainPinMousedownHandler = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var mainPinMouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
    mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';
    var mainPinActiveCoords = window.card.getPinCoords(mainPinElement, true);
    window.form.fillAddress(mainPinActiveCoords.pinX + ', ' + mainPinActiveCoords.pinY);
  };

  var mainPinMouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mainPinMouseMoveHandler);
    document.removeEventListener('mouseup', mainPinMouseUpHandler);
  };

  document.addEventListener('mousemove', mainPinMouseMoveHandler);
  document.addEventListener('mouseup', mainPinMouseUpHandler);
};

mainPinElement.addEventListener('mousedown', mainPinMousedownHandler);
