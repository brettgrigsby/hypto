'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('./api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var bittrex = {
  book: {
    asks: [],
    bids: []
  },
  getBook: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _api.getAsks)();

            case 2:
              bittrex.book.asks = _context.sent;
              _context.next = 5;
              return (0, _api.getBids)();

            case 5:
              bittrex.book.bids = _context.sent;

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function getBook() {
      return _ref.apply(this, arguments);
    }

    return getBook;
  }(),
  pollBook: function pollBook() {
    bittrex.getBook();
    setTimeout(bittrex.pollBook, 10000);
  },
  getVolume: function getVolume() {
    var askVolume = bittrex.book.asks.reduce(function (acc, item) {
      var Quantity = item.Quantity,
          Rate = item.Rate;

      acc[Rate] = acc[Rate] ? acc[Rate] + Quantity : Quantity;
      return acc;
    }, {});
    return askVolume;
  }
};

exports.default = bittrex;