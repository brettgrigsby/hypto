import axios from 'axios';

const bittrexApi = axios.create({
  baseURL: 'https://bittrex.com/api/v1.1/public'
});

function getAsks(market) {
  return bittrexApi.get(`/getorderbook?market=${market}&type=sell`)
    .then( function(response) {
      return response.data.result;
    })
    .catch(function(error) {
      console.log({error});
    });
}

function getBids(market) {
  return bittrexApi.get(`/getorderbook?market=${market}&type=buy`)
    .then( function(response) {
      return response.data.result;
    })
    .catch(function(error) {
      console.log({error});
    });
}

export default { getAsks, getBids };
