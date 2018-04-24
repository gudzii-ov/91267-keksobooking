'use strict';

/* генерируем данные */
var generatedOffers = window.dummyData.generateOffers();

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

/* функция размещает маркеры в блоке маркеров */
var placePins = function (offers) {
  /* функция отрисовки карточки объявления */
  var renderOfferCard = function (offerData) {
    /* функция показывает карточку объявления */
    var getOfferCard = function (offer) {
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

      var getPhotosFragment = function (data) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < data.length; i++) {
          var photoElement = document.createElement('img');
          photoElement.setAttribute('src', data[i]);
          photoElement.setAttribute('width', '100'); // TODO
          photoElement.setAttribute('height', '100'); // TODO
          photoElement.setAttribute('alt', 'Фотография жилья');
          photoElement.classList.add('popup__photo');

          fragment.appendChild(photoElement);
        }

        return fragment;
      };

      var offerTemplate = document.querySelector('template').content.children[0];
      var offerElement = offerTemplate.cloneNode(true);

      var offerTitle = offer.offer.title;
      offerElement.querySelector('.popup__title').textContent = offerTitle;

      var offerAddress = offer.offer.address;
      offerElement.querySelector('.popup__text--address').textContent = offerAddress;

      var offerPrice = offer.offer.price + '\u20BD/ночь';
      offerElement.querySelector('.popup__text--price').textContent = offerPrice;

      /* соответствие типов жилья назвванию */
      var offerTypes = {
        'flat': 'Квартира',
        'house': 'Дом',
        'bungalo': 'Бунгало'
      };
      var offerType = offer.offer.type;
      var offerElementType = offerTypes[offerType];
      offerElement.querySelector('.popup__type').textContent = offerElementType;

      var guestsAndRooms = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
      offerElement.querySelector('.popup__text--capacity').textContent = guestsAndRooms;

      var chekInOut = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
      offerElement.querySelector('.popup__text--time').textContent = chekInOut;

      var offerDescription = offer.offer.description;
      offerElement.querySelector('.popup__description').textContent = offerDescription;

      var featuresFragment = getFeaturesFragment(offer.offer.features);
      var featuresBlock = offerElement.querySelector('.popup__features');
      featuresBlock.textContent = '';
      featuresBlock.appendChild(featuresFragment);

      var photosFragment = getPhotosFragment(offer.offer.photos);
      var photosBlock = offerElement.querySelector('.popup__photos');
      photosBlock.textContent = '';
      photosBlock.appendChild(photosFragment);

      var avatar = offer.author.avatar;
      offerElement.querySelector('.popup__avatar').setAttribute('src', avatar);

      return offerElement;
    };

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

  /* функция создает массив меток объявлений пользователей на основе массив исходных данных data*/
  var generatePins = function (data) {
    var pins = [];

    for (var i = 0; i < data.length; i++) {
      var pinIconWidth = 45;
      var pinIconHeight = 70;
      var offer = data[i];
      var addressX = offer.location.x - Math.floor(pinIconWidth / 2);
      var addressY = offer.location.y - pinIconHeight;
      var avatar = offer.author.avatar;
      var altText = offer.offer.title;

      pins[i] = {
        'innerHTML': '<img src=' + avatar + ' alt="' + altText + '" width="40" height="40" draggable="false">',
        'classList': 'map__pin',
        'style': 'left: ' + addressX + 'px; top: ' + addressY + 'px;'
      };
    }

    return pins;
  };

  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  /* генерируем маркеры на основе данных */
  var pins = generatePins(offers);
  /* обработчик события клика на метке - открывает карточку объявления */

  var addPinClickListener = function (element, offer) {
    var pinClickHandler = function () {
      renderOfferCard(offer);
    };
    element.addEventListener('click', pinClickHandler);
  };

  for (var i = 0; i < pins.length; i++) {
    var pin = document.createElement('button');
    var offer = offers[i];
    pin.classList.add(pins[i].classList);
    pin.innerHTML = pins[i].innerHTML;
    pin.setAttribute('style', pins[i].style);

    addPinClickListener(pin, offer);

    fragment.appendChild(pin);
  }

  mapPinsElement.appendChild(fragment);
};

placePins(generatedOffers);
