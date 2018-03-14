import axios from 'axios';

const bittrexApi = axios.create({
  baseURL: 'https://bittrex.com/api/v1.1/public'
});

function getAsks() {
  return bittrexApi.get(`/getorderbook?market=BTC-LTC&type=sell`)
    .then( function(response) {
      return response.data.result;
    })
    .catch(function(error) {
      console.log({error});
    });
}

function getBids() {
  return bittrexApi.get(`/getorderbook?market=BTC-LTC&type=buy`)
    .then( function(response) {
      return response.data.result;
    })
    .catch(function(error) {
      console.log({error});
    });
}

export { getAsks, getBids };
