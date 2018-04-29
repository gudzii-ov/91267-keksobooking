'use strict';

(function () {
  window.load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var loadHandler = function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    xhr.addEventListener('load', loadHandler);

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Таймаут соединения.');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
