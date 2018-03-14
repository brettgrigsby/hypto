import express from 'express';
import getBook from './modules/bittrex/api';
import bittrex from './modules/bittrex/index';
import cors from 'cors';

const app = express()

bittrex.pollBook();

const corsOptions = {
  allowedHeaders: ['Origin', 'Authorization', 'Content-Type', 'Accept', 'Cache-Control'],
  credentials: true,
  methods: 'GET,OPTIONS,PUT,POST,DELETE'
};

app.use(cors(corsOptions));

app.get('/orderBooks', async (req, res) => {
  try {
    const { market } = req.query;
    const { book } = bittrex;
    res.send({book});
  } catch (error) {
    console.log({error})
  }
});

app.get('/volume', async (req, res) => {
  try {
    res.send({volume: bittrex.getVolume()})
  } catch (error) {
    console.log(error);
  }
});

app.listen(9000, () => console.log('Listening on port 9000'))