import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message, Book} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) {
  }

  fetch(authorId: string): Observable<Book[]> {
    return this.http.get<Book[]>(`/api/book/${authorId}`);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>('/api/book', book);
  }

  update(book: Book): Observable<Book> {
    return this.http.patch<Book>(`/api/book/${book._id}`, book);
  }

  delete(book: Book): Observable<Message> {
    return this.http.delete<Message>(`/api/book/${book._id}`);
  }
}
