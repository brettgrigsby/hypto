import { getAsks, getBids } from './api';

const bittrex = {
  book: {
    asks: [],
    bids: []
  },
  getBook: async () => {
    bittrex.book.asks = await getAsks();
    bittrex.book.bids = await getBids();
  },
  pollBook: () => {
    bittrex.getBook();
    setTimeout(bittrex.pollBook, 10000);
  },
  getVolume: () => {
    const askVolume = bittrex.book.asks.reduce((acc, item) => {
      const { Quantity, Rate } = item;
      acc[Rate] = acc[Rate] ? acc[Rate] + Quantity : Quantity;
      return acc;
    }, {})
    return askVolume;
  }
};

export default bittrex;
