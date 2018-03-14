'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBids = exports.getAsks = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bittrexApi = _axios2.default.create({
  baseURL: 'https://bittrex.com/api/v1.1/public'
});

function getAsks() {
  return bittrexApi.get('/getorderbook?market=BTC-LTC&type=sell').then(function (response) {
    return response.data.result;
  }).catch(function (error) {
    console.log({ error: error });
  });
}

function getBids() {
  return bittrexApi.get('/getorderbook?market=BTC-LTC&type=buy').then(function (response) {
    return response.data.result;
  }).catch(function (error) {
    console.log({ error: error });
  });
}

exports.getAsks = getAsks;
exports.getBids = getBids;