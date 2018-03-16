import "babel-core/register";
import "babel-polyfill";
import express from 'express';
import cors from 'cors';

import bittrex from './modules/bittrex/index';
import poloniex from './modules/poloniex/index';
import Combotron from './modules/combotron/index';

const app = express()

bittrex.poll();
poloniex.poll();

const combotron = new Combotron({bittrex, poloniex});

const corsOptions = {
  allowedHeaders: ['Origin', 'Authorization', 'Content-Type', 'Accept', 'Cache-Control'],
  credentials: true,
  methods: 'GET,OPTIONS,PUT,POST,DELETE'
};

app.use(cors(corsOptions));

app.get('/orderBooks', async (req, res) => {
  try {
    const market = req.query.market || 'BTC-LTC';
    const book = combotron.getBookFor(market);
    res.send({book});
  } catch (error) {
    console.log({error})
  }
});

app.get('/volume', async (req, res) => {
  try {
    const market = req.query.market || 'BTC-LTC';
    res.send({volume: bittrex.getVolumeFor(market)})
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Listening on port ${port}`))