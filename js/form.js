'use strict';

(function () {
  var TYPE_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var formBlock = document.querySelector('.ad-form');
  var formElements = formBlock.querySelectorAll('fieldset');

  var disableFormElements = function () {
    formElements.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };

  var enableFormElements = function () {
    formElements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
    addressField.setAttribute('readonly', 'true');
  };

  var disableForm = function () {
    formBlock.classList.add('ad-form--disabled');
    disableFormElements();
  };

  var enableForm = function () {
    formBlock.classList.remove('ad-form--disabled');
    enableFormElements();
  };

  var addressField = formBlock.elements.address;

  var fillAddress = function (text) {
    addressField.value = text;
    addressField.placeholder = text;
  };

  var priceField = formBlock.elements.price;
  var typeField = formBlock.elements.type;

  var setPriceFieldAttributes = function (value) {
    priceField.setAttribute('min', value);
    priceField.setAttribute('placeholder', value);
  };

  var onchangeTypeHandler = function () {
    var type = typeField.value;
    var price = TYPE_PRICE[type];
    setPriceFieldAttributes(price);
  };

  typeField.addEventListener('change', onchangeTypeHandler);

  var timeinField = formBlock.elements.timein;
  var timeoutField = formBlock.elements.timeout;

  var syncTimefields = function (field1, field2) {
    var onchangeTimeHandler = function () {
      field2.value = field1.value;
    };

    field1.addEventListener('change', onchangeTimeHandler);
  };

  syncTimefields(timeinField, timeoutField);
  syncTimefields(timeoutField, timeinField);

  var roomsField = formBlock.elements.rooms;
  var capacityField = formBlock.elements.capacity;

  var checkRoomCapacity = function () {
    var constraints = {
      1: ['1'],
      2: ['1', '2'],
      3: ['1', '2', '3'],
      100: ['0']
    };

    var roomsNumber = roomsField.value;
    var constraint = constraints[roomsNumber];
    var constraintString = 'Возможное количество гостей: ' + constraint.join(', ');

    var capacity = capacityField.value;

    if (constraint.indexOf(capacity) !== (-1)) {
      capacityField.setCustomValidity('');
    } else {
      capacityField.setCustomValidity(constraintString);
    }
  };

  roomsField.addEventListener('change', checkRoomCapacity);
  capacityField.addEventListener('change', checkRoomCapacity);

  var submitButton = formBlock.querySelector('.ad-form__submit');
  submitButton.addEventListener('click', checkRoomCapacity);

  window.form = {
    disableForm: disableForm,
    enableForm: enableForm,
    fillAddress: fillAddress
  };
})();
