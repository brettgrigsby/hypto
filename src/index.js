import "babel-core/register";
import "babel-polyfill";
import express from 'express';
import getBook from './modules/bittrex/api';
import bittrex from './modules/bittrex/index';
import cors from 'cors';

const app = express()

bittrex.poll();

const corsOptions = {
  allowedHeaders: ['Origin', 'Authorization', 'Content-Type', 'Accept', 'Cache-Control'],
  credentials: true,
  methods: 'GET,OPTIONS,PUT,POST,DELETE'
};

app.use(cors(corsOptions));

app.get('/orderBooks', async (req, res) => {
  try {
    const market = req.query.market || 'BTC-LTC';
    const book = bittrex.getBookFor(market);
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

var port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Listening on port ${port}`))