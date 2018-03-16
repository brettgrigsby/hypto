import api from './api';
import CryptoGnome from '../cryptoGnome/index';

class PoloGnome extends CryptoGnome {
  normalizeBookOrders(orders) {
    return orders.map(order => {
      return {
        Rate: parseFloat(order[0]),
        Quantity: order[1]
      };
    })
  }

  async fetchBooks() {
    const { books, api, markets } = this;
    for (let market of markets) {
      try {
        const book = await api.getBook(market);
        books[market] = {
          asks: this.normalizeBookOrders(book.asks),
          bids: this.normalizeBookOrders(book.bids)
        };
      } catch (error) {
        console.log(`error fetching books for ${market}: `, error)
      }
    }
  }
}

const poloniex = new PoloGnome(api);

export default poloniex;