class CryptoGnome {
  constructor(api) {
    this.api = api;
    this.books = {};
    this.volumes = {};
    this.markets = ['BTC-LTC']
  }

  getBookFor(market) {
    return this.books[market];
  }

  getVolumeFor(market) {
    return this.volumes[market];
  }

  async fetchBooks() {
    const { books, api, markets } = this;
    for (let market of markets) {
      try {
        const asks = await api.getAsks(market);
        const bids = await api.getBids(market);
        books[market] = { asks, bids };
      } catch (error) {
        console.log(`error fetching books for ${market}: `, error)
      }
    }
  }

  setVolumes() {
    const { books, volumes, markets } = this;
    markets.forEach(market => {
      if (books[market]) {
        volumes[market] = {};
        volumes[market].asks = this.ordersToVolume(books[market].asks);
        volumes[market].bids = this.ordersToVolume(books[market].bids);
      }
    });
  }

  ordersToVolume(orders) {
    return orders.reduce((acc, item) => {
      const { Quantity, Rate } = item;
      const roundedKey = Math.round(Rate * 10000) / 10000;
      acc[roundedKey] = acc[roundedKey] ? acc[roundedKey] + Quantity : Quantity;
      return acc;
    }, {})
  }

  poll() {
    this.fetchBooks();
    this.setVolumes();
    setTimeout(this.poll.bind(this), 10000);
  }
};

export default CryptoGnome;
