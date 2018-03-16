'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Combotron = function () {
  function Combotron(exchanges) {
    _classCallCheck(this, Combotron);

    this.exchanges = exchanges;
  }

  _createClass(Combotron, [{
    key: 'getBookFor',
    value: function getBookFor() {
      var _this = this;

      var market = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'BTC-LTC';
      var exchanges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['poloniex', 'bittrex'];

      return exchanges.reduce(function (acc, exchange) {
        var exchangeBook = _this.exchanges[exchange].getBookFor(market);
        if (!exchangeBook) {
          return acc;
        }
        acc.asks[exchange] = exchangeBook.asks;
        acc.bids[exchange] = exchangeBook.bids;
        return acc;
      }, { asks: {}, bids: {} });
    }
  }, {
    key: 'getMatchesFor',
    value: function getMatchesFor() {
      var market = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'BTC-LTC';
      var exchanges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['poloniex', 'bittrex'];
    }
  }, {
    key: 'getVolumeFor',
    value: function getVolumeFor() {
      var _this2 = this;

      var market = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'BTC-LTC';
      var exchanges = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['poloniex', 'bittrex'];

      return exchanges.reduce(function (acc, exchange) {
        var volume = _this2.exchanges[exchange].getVolumeFor(market);
        if (!volume) {
          return acc;
        }
        acc.asks[exchange] = volume.asks;
        acc.bids[exchange] = volume.bids;
        return acc;
      }, { bids: {}, asks: {} });
    }
  }]);

  return Combotron;
}();

exports.default = Combotron;