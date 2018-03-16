'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var marketMap = {
  'BTC-ETH': 'BTC_ETH',
  'BTC-LTC': 'BTC_LTC'
};

var poloniexApi = _axios2.default.create({
  baseURL: 'https://poloniex.com'
});

function getBook(market) {
  return poloniexApi.get('/public?command=returnOrderBook&currencyPair=' + marketMap[market] + '&depth=10000').then(function (response) {
    return response.data;
  }).catch(function (error) {
    console.log({ error: error });
  });
}

exports.default = { getBook: getBook };