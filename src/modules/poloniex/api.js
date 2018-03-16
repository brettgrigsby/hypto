import axios from 'axios';

const marketMap = {
  'BTC-LTC': 'BTC_LTC'
}

const poloniexApi = axios.create({
  baseURL: 'https://poloniex.com'
});

function getBook(market) {
  return poloniexApi.get(`/public?command=returnOrderBook&currencyPair=${marketMap[market]}&depth=10000`)
    .then( function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log({error});
    });
}

export default { getBook };
