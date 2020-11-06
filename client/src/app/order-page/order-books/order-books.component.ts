import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router'
import {BooksService} from '../../shared/services/books.service'
import {Observable} from 'rxjs'
import {Book} from '../../shared/interfaces'
import {switchMap, map} from 'rxjs/operators'
import {OrderService} from '../order.service'
import {MaterialService} from '../../shared/classes/material.service'

@Component({
  selector: 'app-order-books',
  templateUrl: './order-books.component.html',
  styleUrls: ['./order-books.component.css']
})
export class OrderBooksComponent implements OnInit {

  books$: Observable<Book[]>

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private order: OrderService) {
  }

  ngOnInit() {
    this.books$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.booksService.fetch(params['id'])
          }
        ),
        map(
          (books: Book[]) => {
            return books.map(book => {
              book.quantity = 1
              return book
            })
          }
        )
      )
  }

  addToOrder(book: Book) {
    MaterialService.toast(`Добавлено x${book.quantity}`)
    this.order.add(book)
  }

}
