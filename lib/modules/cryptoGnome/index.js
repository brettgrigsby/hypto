'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CryptoGnome = function () {
  function CryptoGnome(api) {
    _classCallCheck(this, CryptoGnome);

    this.api = api;
    this.books = {};
    this.volumes = {};
    this.markets = ['BTC-LTC'];
  }

  _createClass(CryptoGnome, [{
    key: 'getBookFor',
    value: function getBookFor(market) {
      return this.books[market];
    }
  }, {
    key: 'getVolumeFor',
    value: function getVolumeFor(market) {
      return this.volumes[market];
    }
  }, {
    key: 'fetchBooks',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var books, api, markets, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, market, asks, bids;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                books = this.books, api = this.api, markets = this.markets;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 4;
                _iterator = markets[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 24;
                  break;
                }

                market = _step.value;
                _context.prev = 8;
                _context.next = 11;
                return api.getAsks(market);

              case 11:
                asks = _context.sent;
                _context.next = 14;
                return api.getBids(market);

              case 14:
                bids = _context.sent;

                books[market] = { asks: asks, bids: bids };
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](8);

                console.log('error fetching books for ' + market + ': ', _context.t0);

              case 21:
                _iteratorNormalCompletion = true;
                _context.next = 6;
                break;

              case 24:
                _context.next = 30;
                break;

              case 26:
                _context.prev = 26;
                _context.t1 = _context['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 30:
                _context.prev = 30;
                _context.prev = 31;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 33:
                _context.prev = 33;

                if (!_didIteratorError) {
                  _context.next = 36;
                  break;
                }

                throw _iteratorError;

              case 36:
                return _context.finish(33);

              case 37:
                return _context.finish(30);

              case 38:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 26, 30, 38], [8, 18], [31,, 33, 37]]);
      }));

      function fetchBooks() {
        return _ref.apply(this, arguments);
      }

      return fetchBooks;
    }()
  }, {
    key: 'setVolumes',
    value: function setVolumes() {
      var _this = this;

      var books = this.books,
          volumes = this.volumes,
          markets = this.markets;

      markets.forEach(function (market) {
        if (books[market]) {
          volumes[market] = {};
          volumes[market].asks = _this.ordersToVolume(books[market].asks);
          volumes[market].bids = _this.ordersToVolume(books[market].bids);
        }
      });
    }
  }, {
    key: 'ordersToVolume',
    value: function ordersToVolume(orders) {
      return orders.reduce(function (acc, item) {
        var Quantity = item.Quantity,
            Rate = item.Rate;

        var roundedKey = Math.round(Rate * 10000) / 10000;
        acc[roundedKey] = acc[roundedKey] ? acc[roundedKey] + Quantity : Quantity;
        return acc;
      }, {});
    }
  }, {
    key: 'poll',
    value: function poll() {
      this.fetchBooks();
      this.setVolumes();
      setTimeout(this.poll.bind(this), 10000);
    }
  }]);

  return CryptoGnome;
}();

;

exports.default = CryptoGnome;