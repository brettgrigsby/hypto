import "babel-core/register";
import "babel-polyfill";
import express from 'express';
import cors from 'cors';

import bittrex from './modules/bittrex/index';
import poloniex from './modules/poloniex/index';
import bitfinex from './modules/bitfinex/index';
import Combotron from './modules/combotron/index';


const app = express()

bittrex.poll();
poloniex.poll();
bitfinex.poll();

const combotron = new Combotron({bittrex, poloniex, bitfinex});

const corsOptions = {
  allowedHeaders: ['Origin', 'Authorization', 'Content-Type', 'Accept', 'Cache-Control'],
  credentials: true,
  methods: 'GET,OPTIONS,PUT,POST,DELETE'
};

app.use(cors(corsOptions));

app.get('/orderBooks', async (req, res) => {
  try {
    const exchanges = req.query.exchanges.split(',');
    const market = req.query.market || 'BTC-ETH';
    const book = combotron.getBookFor(market, exchanges);
    res.send({book});
  } catch (error) {
    console.log({error})
  }
});

app.get('/volume', async (req, res) => {
  try {
    const exchanges = req.query.exchanges.split(',');
    const market = req.query.market || 'BTC-LTC';
    res.send({volume: combotron.getVolumeFor(market, exchanges)})
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Listening on port ${port}`))