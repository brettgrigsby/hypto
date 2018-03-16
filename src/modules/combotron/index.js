class Combotron {
  constructor(exchanges) {
    this.exchanges = exchanges;
  }

  getBookFor(market = 'BTC-LTC', exchanges = ['poloniex', 'bittrex']) {
    return exchanges.reduce((acc, exchange) => {
      const exchangeBook = this.exchanges[exchange].getBookFor(market);
      if (!exchangeBook) { return acc; }
      acc.asks[exchange] = exchangeBook.asks;
      acc.bids[exchange] = exchangeBook.bids;
      return acc;
    }, { asks: {}, bids: {} });
  }

  getMatchesFor(market = 'BTC-LTC', exchanges = ['poloniex', 'bittrex']) {

  }

  getVolumeFor(market = 'BTC-LTC', exchanges = ['poloniex', 'bittrex']) {
    return exchanges.reduce((acc, exchange) => {
      const volume = this.exchanges[exchange].getVolumeFor(market);
      if (!volume) { return acc; }
      acc.asks[exchange] = volume.asks;
      acc.bids[exchange] = volume.bids;
      return acc;
    }, {bids: {}, asks: {}});
  }
}

export default Combotron;
