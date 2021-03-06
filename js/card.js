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
  var getOfferCardElement = function () {
    var template = document.querySelector('template').content.children[0];
    var cardElement = template.cloneNode(true);
    cardElement.style.display = 'none';

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
  var showOfferCard = function (element, data) {
    fillOfferCard(element, data);

    if (element.style.display === 'none') {
      element.style.display = 'block';
    }

    var cardCloseElement = element.querySelector('.popup__close');

    var popupCloseClickHandler = function () {
      element.style.display = 'none';
      cardCloseElement.removeEventListener('click', popupCloseClickHandler);
    };

    cardCloseElement.addEventListener('click', popupCloseClickHandler);

  };

  window.card = {
    getOfferCardElement: getOfferCardElement,
    showOfferCard: showOfferCard
  };
})();
