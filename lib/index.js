'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./modules/bittrex/api');

var _api2 = _interopRequireDefault(_api);

var _index = require('./modules/bittrex/index');

var _index2 = _interopRequireDefault(_index);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();

_index2.default.pollBook();

var corsOptions = {
  allowedHeaders: ['Origin', 'Authorization', 'Content-Type', 'Accept', 'Cache-Control'],
  credentials: true,
  methods: 'GET,OPTIONS,PUT,POST,DELETE'
};

app.use((0, _cors2.default)(corsOptions));

app.get('/orderBooks', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var market, book;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              market = req.query.market;
              book = _index2.default.book;

              res.send({ book: book });
            } catch (error) {
              console.log({ error: error });
            }

          case 1:
          case 'end':
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
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              res.send({ volume: _index2.default.getVolume() });
            } catch (error) {
              console.log(error);
            }

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

app.listen(9000, function () {
  return console.log('Listening on port 9000');
});