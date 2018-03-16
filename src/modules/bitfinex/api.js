import axios from 'axios';

const marketMap = {
  'BTC-ETH': 'ETHBTC',
  'BTC-LTC': 'LTCBTC'
}

const bitfinexApi = axios.create({
  baseURL: 'https://api.bitfinex.com'
});

function getBook(market) {
  return bitfinexApi.get(`/v1/book/${marketMap[market]}?limit_bids=2000&limit_asks=2000`)
    .then( function(response) {
      return response.data;
    })
    .catch(function(error) {
      console.log({error});
    });
}

export default { getBook };
