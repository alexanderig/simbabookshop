import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {BooksService} from '../../../shared/services/books.service'
import {Book} from '../../../shared/interfaces'
import {MaterialInstance, MaterialService} from '../../../shared/classes/material.service'
import {FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css']
})
export class BooksFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('authorId') authorId: string
  @ViewChild('modal') modalRef: ElementRef

  books: Book[] = []
  loading = false
  bookId = null
  modal: MaterialInstance
  form: FormGroup

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })

    this.loading = true
    this.booksService.fetch(this.authorId).subscribe(books => {
      this.books = books
      this.loading = false
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectBook(book: Book) {
    this.bookId = book._id
    this.form.patchValue({
      name: book.name,
      cost: book.cost
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddBook() {
    this.bookId = null
    this.form.reset({name: null, cost: 1})
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onDeleteBook(event: Event, book: Book) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить книгу "${book.name}"?`)

    if (decision) {
      this.booksService.delete(book).subscribe(
        response => {
          const idx = this.books.findIndex(p => p._id === book._id)
          this.books.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()

    const newBook: Book = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      author: this.authorId
    }

    const completed = () => {
      this.modal.close()
      this.form.reset({name: '', cost: 1})
      this.form.enable()
    }

    if (this.bookId) {
      newBook._id = this.bookId
      this.booksService.update(newBook).subscribe(
        book => {
          const idx = this.books.findIndex(p => p._id === book._id)
          this.books[idx] = book
          MaterialService.toast('Изменения сохранены')
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    } else {
      this.booksService.create(newBook).subscribe(
        book => {
          MaterialService.toast('Книга создана')
          this.books.push(book)
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    }


  }

}
