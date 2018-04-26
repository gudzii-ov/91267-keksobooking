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

  var addressField = formBlock.elements.address;
  var priceField = formBlock.elements.price;
  var typeField = formBlock.elements.type;
  var timeinField = formBlock.elements.timein;
  var timeoutField = formBlock.elements.timeout;

  var disableFormElements = function () {
    formElements.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };

  var enableFormElements = function () {
    formElements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
    addressField.setAttribute('disabled', 'disabled');
  };

  var disableForm = function () {
    formBlock.classList.add('ad-form--disabled');
    disableFormElements();
  };

  var enableForm = function () {
    formBlock.classList.remove('ad-form--disabled');
    enableFormElements();
  };

  var fillAddress = function (text) {
    addressField.value = text;
    addressField.placeholder = text;
  };

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

  var syncTimefields = function (field1, field2) {
    var onchangeTimeHandler = function () {
      field2.value = field1.value;
    };

    field1.addEventListener('change', onchangeTimeHandler);
  };

  syncTimefields(timeinField, timeoutField);
  syncTimefields(timeoutField, timeinField);

  window.form = {
    disableForm: disableForm,
    enableForm: enableForm,
    fillAddress: fillAddress
  };
})();
