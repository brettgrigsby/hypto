'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _index = require('../cryptoGnome/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BitfiGnome = function (_CryptoGnome) {
  _inherits(BitfiGnome, _CryptoGnome);

  function BitfiGnome() {
    _classCallCheck(this, BitfiGnome);

    return _possibleConstructorReturn(this, (BitfiGnome.__proto__ || Object.getPrototypeOf(BitfiGnome)).apply(this, arguments));
  }

  _createClass(BitfiGnome, [{
    key: 'normalizeBookOrders',
    value: function normalizeBookOrders(orders) {
      return orders.map(function (order) {
        return {
          Rate: order.price,
          Quantity: order.amount
        };
      });
    }
  }, {
    key: 'fetchBooks',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var books, api, markets, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, market, book;

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
                  _context.next = 21;
                  break;
                }

                market = _step.value;
                _context.prev = 8;
                _context.next = 11;
                return api.getBook(market);

              case 11:
                book = _context.sent;

                books[market] = {
                  asks: this.normalizeBookOrders(book.asks),
                  bids: this.normalizeBookOrders(book.bids)
                };
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](8);

                console.log('error fetching books for ' + market + ': ', _context.t0);

              case 18:
                _iteratorNormalCompletion = true;
                _context.next = 6;
                break;

              case 21:
                _context.next = 27;
                break;

              case 23:
                _context.prev = 23;
                _context.t1 = _context['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 27:
                _context.prev = 27;
                _context.prev = 28;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 30:
                _context.prev = 30;

                if (!_didIteratorError) {
                  _context.next = 33;
                  break;
                }

                throw _iteratorError;

              case 33:
                return _context.finish(30);

              case 34:
                return _context.finish(27);

              case 35:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 23, 27, 35], [8, 15], [28,, 30, 34]]);
      }));

      function fetchBooks() {
        return _ref.apply(this, arguments);
      }

      return fetchBooks;
    }()
  }]);

  return BitfiGnome;
}(_index2.default);

var bitfinex = new BitfiGnome(_api2.default);

exports.default = bitfinex;