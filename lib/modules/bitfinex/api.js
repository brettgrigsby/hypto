'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var marketMap = {
  'BTC-ETH': 'ETHBTC',
  'BTC-LTC': 'LTCBTC'
};

var bitfinexApi = _axios2.default.create({
  baseURL: 'https://api.bitfinex.com'
});

function getBook(market) {
  return bitfinexApi.get('/v1/book/' + marketMap[market] + '?limit_bids=2000&limit_asks=2000').then(function (response) {
    return response.data;
  }).catch(function (error) {
    console.log({ error: error });
  });
}

exports.default = { getBook: getBook };