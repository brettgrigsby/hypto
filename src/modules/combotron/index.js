class Combotron {
  constructor(exchanges) {
    this.exchanges = exchanges;
  }

  getBookFor(market = 'BTC-LTC', exchanges = ['poloniex', 'bittrex']) {
    return exchanges.reduce((acc, exchange) => {
      const exchangeBook = this.exchanges[exchange].getBookFor(market);
      acc.asks = acc.asks.concat(exchangeBook.asks);
      acc.bids = acc.bids.concat(exchangeBook.bids);
      return acc;
    }, { asks: [], bids: [] });
  }
}

export default Combotron;
