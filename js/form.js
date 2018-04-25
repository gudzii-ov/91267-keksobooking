'use strict';

(function () {
  var formBlock = document.querySelector('.ad-form');
  var formElements = formBlock.querySelectorAll('fieldset');
  var addressField = formBlock.querySelector('#address');

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

  window.form = {
    disableForm: disableForm,
    enableForm: enableForm,
    fillAddress: fillAddress
  };
})();
