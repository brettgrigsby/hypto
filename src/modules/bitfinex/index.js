import api from './api';
import CryptoGnome from '../cryptoGnome/index';

class BitfiGnome extends CryptoGnome {
  normalizeBookOrders(orders) {
    return orders.map(order => {
      return {
        Rate: order.price,
        Quantity: order.amount
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

const bitfinex = new BitfiGnome(api);

export default bitfinex;