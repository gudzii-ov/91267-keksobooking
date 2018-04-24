'use strict';

(function () {
  /* функция готовит DOM-элемент фотографии */
  var getPhotoElement = function (url) {
    var photoElement = document.createElement('img');
    var photoElementWidth = '100';
    var photoElementHeight = '100';

    photoElement.setAttribute('src', url);
    photoElement.setAttribute('width', photoElementWidth);
    photoElement.setAttribute('height', photoElementHeight);
    photoElement.setAttribute('alt', 'Фотография жилья');
    photoElement.classList.add('popup__photo');

    return photoElement;
  };

  /* функция готовит DOM-фрагмент блока фотографий */
  var getPhotosBlockFragment = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var photoURL = data[i];
      var photoElement = getPhotoElement(photoURL);
      fragment.appendChild(photoElement);
    }

    return fragment;
  };

  /* функция готовит DOM-фрагмент блока удобств */
  var getFeaturesFragment = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var featureClass = 'feature--' + data[i];
      var featureElement = document.createElement('li');

      featureElement.classList.add('feature', featureClass);
      fragment.appendChild(featureElement);
    }

    return fragment;
  };

  /* функция создает карточку объявления с обработчиками */
  var getOfferCard = function () {
    var template = document.querySelector('template').content.children[0];
    var cardElement = template.cloneNode(true);

    return cardElement;
  };

  /* функция наполняет карточку объявления данными */
  var fillOfferCard = function (card, offer) {
    var offerTitle = offer.offer.title;
    card.querySelector('.popup__title').textContent = offerTitle;

    var offerAddress = offer.offer.address;
    card.querySelector('.popup__text--address').textContent = offerAddress;

    var offerPrice = offer.offer.price + '\u20BD/ночь';
    card.querySelector('.popup__text--price').textContent = offerPrice;

    /* соответствие типов жилья названию */
    var offerTypes = {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };
    var offerType = offer.offer.type;
    var offerElementType = offerTypes[offerType];
    card.querySelector('.popup__type').textContent = offerElementType;

    var guestsAndRooms = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    card.querySelector('.popup__text--capacity').textContent = guestsAndRooms;

    var chekInOut = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    card.querySelector('.popup__text--time').textContent = chekInOut;

    var offerDescription = offer.offer.description;
    card.querySelector('.popup__description').textContent = offerDescription;

    var featuresFragment = getFeaturesFragment(offer.offer.features);
    var featuresBlock = card.querySelector('.popup__features');
    featuresBlock.textContent = '';
    featuresBlock.appendChild(featuresFragment);

    var photosFragment = getPhotosBlockFragment(offer.offer.photos);
    var photosBlock = card.querySelector('.popup__photos');
    photosBlock.textContent = ''; // удаляет содержимое блока фотографий из шаблона
    photosBlock.appendChild(photosFragment);

    var avatar = offer.author.avatar;
    card.querySelector('.popup__avatar').setAttribute('src', avatar);
  };

  /* функция отрисовки карточки объявления */
  var renderOfferCard = function (offerData) {
    /* функция показывает карточку объявления */
    var offerCard = getOfferCard(offerData);

    var mapElement = document.querySelector('.map');
    var filtersElement = mapElement.querySelector('.map__filters-container');

    mapElement.insertBefore(offerCard, filtersElement);

    var popupElement = mapElement.querySelector('.popup');
    var popupCloseElement = popupElement.querySelector('.popup__close');

    var popupCloseClickHandler = function () {
      popupElement.remove();
      popupCloseElement.removeEventListener('click', popupCloseClickHandler);
    };

    popupCloseElement.addEventListener('click', popupCloseClickHandler);
  };

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
  var addPinClickListener = function (element, data) {
    var pinClickHandler = function () {
      renderOfferCard(data);
    };
    element.addEventListener('click', pinClickHandler);
  };

  /* функция готовит DOM-фрагмент блока маркеров */
  var getPinsBlockFragment = function (pins, offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      var pin = document.createElement('button');
      var offer = offers[i];
      pin.classList.add(pins[i].classList);
      pin.innerHTML = pins[i].innerHTML;
      pin.setAttribute('style', pins[i].style);

      addPinClickListener(pin, offer);

      fragment.appendChild(pin);
    }

    return fragment;
  };

  /* функция размещает маркеры в блоке маркеров */
  var placePins = function (offers) {
    var pins = getPins(offers);
    var pinsFragment = getPinsBlockFragment(pins, offers);
    var mapPinsElement = document.querySelector('.map__pins');
    mapPinsElement.appendChild(pinsFragment);
  };

  window.card = {
    placePins: placePins
  };
})();
