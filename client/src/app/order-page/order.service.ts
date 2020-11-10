import {Injectable} from '@angular/core';
import {OrderBook, Book} from '../shared/interfaces';

@Injectable()
export class OrderService {

  public list: OrderBook[] = [];
  public price = 0;

  add(book: Book) {
    const orderBook: OrderBook = Object.assign({}, {
      name: book.name,
      cost: book.cost,
      quantity: book.quantity,
      _id: book._id
    });

    const candidate = this.list.find(p => p._id === orderBook._id);

    if (candidate) {
      // Изменяем кол-во
      candidate.quantity += orderBook.quantity;
    } else {
      this.list.push(orderBook);
    }

    this.computePrice();
  }

  remove(orderBook: OrderBook) {
    const idx = this.list.findIndex(p => p._id === orderBook._id);
    this.list.splice(idx, 1);
    this.computePrice();
  }

  clear() {
    this.list = [];
    this.price = 0;
  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
  }
}
