'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bittrexApi = _axios2.default.create({
  baseURL: 'https://bittrex.com/api/v1.1/public'
});

function getAsks(market) {
  return bittrexApi.get('/getorderbook?market=' + market + '&type=sell').then(function (response) {
    return response.data.result;
  }).catch(function (error) {
    console.log({ error: error });
  });
}

function getBids(market) {
  return bittrexApi.get('/getorderbook?market=' + market + '&type=buy').then(function (response) {
    return response.data.result;
  }).catch(function (error) {
    console.log({ error: error });
  });
}

exports.default = { getAsks: getAsks, getBids: getBids };