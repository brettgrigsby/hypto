"use strict";

require("babel-core/register");

require("babel-polyfill");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _index = require("./modules/bittrex/index");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./modules/poloniex/index");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("./modules/bitfinex/index");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("./modules/combotron/index");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();

_index2.default.poll();
_index4.default.poll();
_index6.default.poll();

var combotron = new _index8.default({ bittrex: _index2.default, poloniex: _index4.default, bitfinex: _index6.default });

var corsOptions = {
  allowedHeaders: ['Origin', 'Authorization', 'Content-Type', 'Accept', 'Cache-Control'],
  credentials: true,
  methods: 'GET,OPTIONS,PUT,POST,DELETE'
};

app.use((0, _cors2.default)(corsOptions));

app.get('/orderBooks', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var exchanges, market, book;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              exchanges = req.query.exchanges.split(',');
              market = req.query.market || 'BTC-ETH';
              book = combotron.getBookFor(market, exchanges);

              res.send({ book: book });
            } catch (error) {
              console.log({ error: error });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

app.get('/volume', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var exchanges, market;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              exchanges = req.query.exchanges.split(',');
              market = req.query.market || 'BTC-LTC';

              res.send({ volume: combotron.getVolumeFor(market, exchanges) });
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

var port = process.env.PORT || 9000;

app.listen(port, function () {
  return console.log("Listening on port " + port);
});