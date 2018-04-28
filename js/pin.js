'use strict';

(function () {
  /* функция создает DOM-элемент маркера объявления */
  var getPinElement = function (data) {
    var pinIconWidth = 45;
    var pinIconHeight = 70;
    var addressX = data.location.x - Math.floor(pinIconWidth / 2);
    var addressY = data.location.y - pinIconHeight;
    var avatar = data.author.avatar;
    var altText = data.offer.title;

    var pin = {
      'innerHTML': '<img src=' + avatar + ' alt="' + altText + '" width="40" height="40" draggable="false">',
      'classList': 'map__pin',
      'style': 'left: ' + addressX + 'px; top: ' + addressY + 'px;'
    };

    return pin;
  };

  /* функция создает массиы маркеров объявлений */
  var getPins = function (data) {
    /* создаем массив меток объявлений пользователей на основе массива offers */
    var pins = [];
    for (var i = 0; i < data.length; i++) {
      pins[i] = getPinElement(data[i]);
    }
    return pins;
  };

  /* обработчик события клика на метке - открывает карточку объявления */
  var addPinClickListener = function (element, cardElement, data) {
    var pinClickHandler = function () {
      window.card.showOfferCard(cardElement, data);
    };
    element.addEventListener('click', pinClickHandler);
  };

  /* функция готовит DOM-фрагмент блока маркеров */
  var getPinsBlockFragment = function (pins, cardElement, offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      var pin = document.createElement('button');
      var offer = offers[i];
      pin.classList.add(pins[i].classList);
      pin.innerHTML = pins[i].innerHTML;
      pin.setAttribute('style', pins[i].style);

      addPinClickListener(pin, cardElement, offer);

      fragment.appendChild(pin);
    }

    return fragment;
  };

  /* функция размещает маркеры в блоке маркеров */
  var placePins = function (offers) {
    var offerCard = window.card.getOfferCard(offers);
    var pins = getPins(offers);
    var pinsFragment = getPinsBlockFragment(pins, offerCard, offers);
    var mapPinsElement = document.querySelector('.map__pins');

    mapPinsElement.appendChild(pinsFragment);
  };

  var getPinCoords = function (containerBlock, pinElement, isTailed) {
    var containerBlockDimensions = window.util.getElementDimensions(containerBlock);
    var pinDimensions = window.util.getElementDimensions(pinElement);

    // позиция блока-контейнера в документе
    var containerBlockDocumentPosition = {
      top: containerBlockDimensions.position.top + pageYOffset,
      bottom: containerBlockDimensions.position.bottom + pageYOffset,
      left: containerBlockDimensions.position.left + pageXOffset,
      right: containerBlockDimensions.position.right + pageXOffset
    };

    // позиция маркера внутри контейнера = позиция маркера в документе - позиция контейнера в документе
    var pinElementContainerPosition = {
      top: pinDimensions.position.top + pageYOffset - containerBlockDocumentPosition.top,
      bottom: pinDimensions.position.bottom + pageYOffset - containerBlockDocumentPosition.bottom,
      left: pinDimensions.position.left + pageXOffset - containerBlockDocumentPosition.left,
      right: pinDimensions.position.right + pageXOffset - containerBlockDocumentPosition.right
    };

    if (isTailed) {
      var PIN_TAIL_HEIGHT = 22;
      var pinY = pinElementContainerPosition.top + pinDimensions.dimensions.height + PIN_TAIL_HEIGHT;
    } else {
      pinY = pinElementContainerPosition.top + pinDimensions.dimensions.height / 2;
    }

    var pinCoords = {
      pinX: pinElementContainerPosition.left + pinDimensions.dimensions.width / 2,
      pinY: pinY
    };

    return pinCoords;
  };

  var addMainPinMousedownHandler = function (containerBlock, mainPinElement) {
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
        var mainPinActiveCoords = window.card.getPinCoords(containerBlock, mainPinElement, true);
        window.form.fillAddress(mainPinActiveCoords.pinX + ', ' + mainPinActiveCoords.pinY);
      };

      var mainPinMouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        var mainPinActiveCoords = window.card.getPinCoords(containerBlock, mainPinElement, true);
        window.form.fillAddress(mainPinActiveCoords.pinX + ', ' + mainPinActiveCoords.pinY);

        document.removeEventListener('mousemove', mainPinMouseMoveHandler);
        document.removeEventListener('mouseup', mainPinMouseUpHandler);
      };

      document.addEventListener('mousemove', mainPinMouseMoveHandler);
      document.addEventListener('mouseup', mainPinMouseUpHandler);
    };

    mainPinElement.addEventListener('mousedown', mainPinMousedownHandler);
  };

  window.pin = {
    placePins: placePins,
    getPinCoords: getPinCoords,
    addMainPinMousedownHandler: addMainPinMousedownHandler
  };
})();
